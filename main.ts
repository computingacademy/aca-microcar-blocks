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

/**
 * Grid Blocks
 */
//% weight=48 color=#FF6523 icon="\uf009" block="Grid"
//% groups="['Setup', 'Grid']"
namespace grid {
    let rcal = 90;
    let fcal = 1;
    let flcal = 0; //forward left calibrate
    let frcal = 0; //forward right calibrate
    let strip: neopixel_hidden.Strip = null //make strip

    /**
    * Move the micro:car forwards for 5 seconds then measure and see how straight it goes
    * no input
    */
    //% weight=96
    //% group="Grid"
    export function forward() {
        BitKit.setMotormoduleSpeed(255 - flcal, 255 - frcal);
        basic.pause(2250)
        //basic.pause(2250 + 2 * x ^ 2 + bonus); //needs to be different for each robot. Currently setup for Lewis
        BitKit.setMotormoduleSpeed(0, 0);
        basic.pause(600)
    }

    /**
    * Turn Left
    * no input
    */
    //% weight=96
    //% group="Grid"
    export function turnleft() {
        BitKit.setMotormoduleSpeed(-255, 255);
        //basic.pause(867 + 9 * x + bonus);
        basic.pause(rcal)
        BitKit.setMotormoduleSpeed(0, 0);
        basic.pause(600)
    }

    /**
    * Turn Right
    * no input
    */
    //% weight=96
    //% group="Grid"
    export function turnright() {
        BitKit.setMotormoduleSpeed(255, -255);
        basic.pause(rcal - fcal * 5) //right different to left due to wonky wheels
        BitKit.setMotormoduleSpeed(0, 0);
        basic.pause(600)
    }

    /**
    * Calibration setup
    * two inputs
    */
    //% weight=96
    //% group="Setup"
    export function setup(forwardinput: number, rotationinput: number) {
        strip = neopixel_hidden.create(DigitalPin.P1, 4, NeoPixelMode.RGB)

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
}

namespace ws2812b {
    //% shim=sendBufferAsm
    export function sendBuffer(buf: Buffer, pin: DigitalPin) {
    }
}
