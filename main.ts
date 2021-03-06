enum LeftorRight {
    straight = 3,
    left = 1,
    right = 2,
};
    
/**
 * Calibration blocks
 */
//% weight=48 color=#FF4EC7 icon="\uf0ad" block="Calibrate"
//% groups="['Calibration', 'Setup']"
namespace calibrate {
    /**
     * Move the micro:car forwards for 7 seconds so we can measure and see how straight it went
     */
    //% weight=96
    //% block="forward calibrate"
    //% group="Calibration"
    export function forwards() {
        BitKit.setMotormoduleSpeed(255, 255);
        basic.pause(7000); //7 seconds
        BitKit.setMotormoduleSpeed(0, 0);
    }

    /**
    * Rotate the micro:car for 10 seconds so we can measure what angle it rotated to
    */
    //% weight=96
    //% block="rotation calibrate"
    //% group="Calibration"
    export function rotates() {
        BitKit.setMotormoduleSpeed(-255, 255);
        basic.pause(10000); //10 seconds
        BitKit.setMotormoduleSpeed(0, 0);
    }
}

//dummy change for commit x2

/**
 * Grid Blocks
 */
//% weight=48 color=#FF6523 icon="\uf009" block="Grid"
//% groups="['Setup', 'Grid']"
namespace grid {
    let rcal = 1000;
    export let fcal = 0;
    let flcal = 0; //forward left calibrate
    let frcal = 0; //forward right calibrate
    let strip: newopixel.Strip = null //make strip
    let bonus = 0
    /**
    * Move the micro:car forwards one grid step
    */
    //% weight=96
    //% block="forward one step"
    //% group="Grid"
    export function forward() {
        BitKit.setMotormoduleSpeed(255 - flcal, 255 - frcal);
        basic.pause(2250 + 10 * Math.abs(fcal) + bonus) //add extra distance for over calibrated robots (10*fcal) 
        //and bonus distance option if slowcar is called
        BitKit.setMotormoduleSpeed(0, 0);
        basic.pause(600)
    }

    /**
    * Turn Right/Left until line
    */
    //% weight=96
    //% block="go |%direction|"
    //% group="Grid"
    //% advanced = true
    export function turnUntilLine(direction: LeftorRight) {
        let rw, lw, rw2, lw2 = 0;
        if (direction == 2){ //right
            lw = 200;
            rw = 60; //shrunk cos most robots are worse at turning right
            lw2 = 200;
            rw2 = 0;
        }
        else if (direction == 1){ //left
            lw = 65;
            rw = 200;
            lw2 = 0;
            rw2 = 200;
        }
        
        if (direction !=3){ //if turning
            
            BitKit.setMotormoduleSpeed(lw, rw); //move blindly
            basic.pause(500);
            driver.i2cSendByte(SensorType.Liner, 0x02);
            let event = driver.i2cReceiveByte(SensorType.Liner); //move until you hit the DAL.DEVICE_PIN_DEFAULT_SERVO_CENTER sensor on line
            while (event != LinerEvent.Middle) {
                driver.i2cSendByte(SensorType.Liner, 0x02);
                event = driver.i2cReceiveByte(SensorType.Liner);
            }

        }
        else { //if straight
            BitKit.setMotormoduleSpeed(200,200); //move blindly forwards for a bit
            basic.pause(900); //upped from 800 to suit gina
        }
        BitKit.setMotormoduleSpeed(0, 0);
        basic.pause(600)
    }
    /**
    * Follow line
    */
    //% weight=95
    //% block="follow line until dot"
    //% group="Grid"
    //% advanced=true
    export function line_follow () {
        //blindly forward a bit to start
        BitKit.setMotormoduleAction(DirectionTpye.Forward, SpeedTpye.Medium)
        //basic.pause(700) //blindy go forward to get past dot
        while (!(BitKit.wasAllLinePosTriggered())) {
            if (BitKit.wasLinePositionTriggered(LinerEvent.Middle)) {
                BitKit.setMotormoduleAction(DirectionTpye.Forward, SpeedTpye.Medium)
            } else if (BitKit.wasLinePositionTriggered(LinerEvent.Left)) {
                BitKit.setMotormoduleAction(DirectionTpye.Left, SpeedTpye.Medium)
            } else if (BitKit.wasLinePositionTriggered(LinerEvent.Right)) {
                BitKit.setMotormoduleAction(DirectionTpye.Right, SpeedTpye.Medium)
            } else if (BitKit.wasLinePositionTriggered(LinerEvent.Rightmost)) {
                BitKit.setMotormoduleAction(DirectionTpye.Right, SpeedTpye.Medium)
            } else if (BitKit.wasLinePositionTriggered(LinerEvent.Leftmost)) {
                BitKit.setMotormoduleAction(DirectionTpye.Left, SpeedTpye.Medium)
            }
        }
        BitKit.stopMotormodule()
        basic.pause(500)
    }

    /**
    * Turn Left (90 degrees with calibration)
    */
    //% weight=96
    //% block="turn left"
    //% group="Grid"
    export function turnleft() {
        BitKit.setMotormoduleSpeed(-255, 255);
        //basic.pause(867 + 9 * x + bonus);
        basic.pause(rcal)
        BitKit.setMotormoduleSpeed(0, 0);
        basic.pause(600)
    }

    /**
    * Turn Right (90 degrees with calibration)
    */
    //% weight=96
    //% block="turn right"
    //% group="Grid"
    export function turnright() {
        BitKit.setMotormoduleSpeed(255, -255);
        basic.pause(rcal - fcal * 5) //right different to left due to wonky wheels
        BitKit.setMotormoduleSpeed(0, 0);
        basic.pause(600)
    }

    /**
    * Enter your calibration here: the forward number, then the rotation number.
    */
    //% weight=96
    //% block="setup f:|%fcal r:|%rcal"
    //% group="Setup"
    export function setup(forwardinput: number, rotationinput: number) {
        strip = newopixel.create(DigitalPin.P1, 4, NewoPixelMode.RGB)

        rcal = 1000 * 90 / rotationinput; //time needed to turn left in ms

        if (forwardinput > 0) {
            flcal = forwardinput;
        }
        else if (forwardinput < 0) {
            frcal = -forwardinput;
        }
        else {
            //error please enter number
        }
        fcal = forwardinput
        //x = Math.abs(flcal + frcal)
    }
    /**
     * Makes the car move forwards for an extra 250ms when 'forward one step' is called.
     */
    //% weight=70
    //% advanced = true
    //% block="slow car: |%istrue"
    export function slowcar(istrue: boolean) {
        if (istrue) {
            bonus += 250 //make the car run further
        }
    }
}

namespace ws2812b_cp {
    //% shim=sendBufferAsm
    export function sendBuffer(buf: Buffer, pin: DigitalPin) {
    }
}
