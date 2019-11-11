/**
 * Calibration blocks
 */
//% weight=48 color=#FF4EC7 icon="\uf0ad" block="Calibrate"
//% groups="['Calibration', 'Setup']"
namespace calibrate {
    /**
     * Move the micro:car forwards for 5 seconds then measure and see how straight it goes
     * no input
     */
    //% weight=96
    //% block="forward calibrate"
    //% group="Calibration"
    export function forwards() {
        BitKit.setMotormoduleSpeed(255, 255);
        basic.pause(7000); //7.5 seconds
        BitKit.setMotormoduleSpeed(0, 0);
    }

    /**
    * Rotate the micro:car for 5 seconds then measure how far it got
    * no input
    */
    //% weight=96
    //% block="rotation calibrate"
    //% group="Calibration"
    export function rotates() {
        BitKit.setMotormoduleSpeed(-255, 255);
        basic.pause(10000); //5 seconds
        BitKit.setMotormoduleSpeed(0, 0);
    }
}

/**
 * Grid Blocks
 */
//% weight=48 color=#FF6523 icon="\uf009" block="Grid"
//% groups="['Setup', 'Grid']"
namespace grid {
    let m = [2460, 1020, 950]
    let rcal = 1;
    let fcal = 1;
    let flcal = 0; //forward left calibrate
    let frcal = 0; //forward right calibrate
    let strip: neopixel.Strip = null //make strip
    let x = 0 //init
    let short = 0

    /**
    * Move the micro:car forwards for 5 seconds then measure and see how straight it goes
    * no input
    */
    //% weight=96
    //% block="forward one space"
    //% group="Grid"
    export function forward() {
        let bonus = 520 * short //extra distance for cars that run short
        BitKit.setMotormoduleSpeed(255 - flcal, 255 - frcal);
        basic.pause(m[0])
        //basic.pause(2250 + 2 * x ^ 2 + bonus); //needs to be different for each robot. Currently setup for Lewis
        BitKit.setMotormoduleSpeed(0, 0);
    }

    /**
    * Turn Left
    * no input
    */
    //% weight=96
    //% block="turn left"
    //% group="Grid"
    export function turnleft() {
        let bonus = 160 * short //extra distance for cars that run short
        let rotcal = 7 - x
        BitKit.setMotormoduleSpeed(-255, 255);
        //basic.pause(867 + 9 * x + bonus);
        basic.pause(m[1])
        BitKit.setMotormoduleSpeed(0, 0);
    }

    /**
    * Turn Right
    * no input
    */
    //% weight=96
    //% block="turn right"
    //% group="Grid"
    export function turnright() {
        let bonus = 200 * short
        let rotcal = 7 - x
        BitKit.setMotormoduleSpeed(255, -255);
        //basic.pause(813 + 21 * x + bonus); // (for 0 calib only)
        basic.pause(m[2])
        BitKit.setMotormoduleSpeed(0, 0);
    }

    /**
    * Calibration setup
    * two inputs
    */
    //% weight=96
    //% block="setup f:|%fcal r:|%rcal"
    //% group="Setup"
    export function setup(forwardinput: number, rotationinput: number) {
        strip = neopixel.create(DigitalPin.P1, 4, NeoPixelMode.RGB)

        //rcal = rotationinput * 1; //dark magic
        short = rotationinput;
        if (forwardinput > 0) {
            flcal = forwardinput;
        }
        else if (forwardinput < 0) {
            frcal = -forwardinput;
        }
        else {
            //error please enter number
        }
        x = Math.abs(flcal + frcal)
    }
}

