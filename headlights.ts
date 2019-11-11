/**
 * Headlights Blocks
 */
//% weight=48 color=#ff9f1f icon="\uf0e7" block="Lights"
//% groups="['Action', 'Colours']"
namespace lights {
    let strip = neopixel.create(DigitalPin.P1, 4, NeoPixelMode.RGB)

    /**
    * Make explosion movement and sound
    * rattle motors, make noise on speaker, show pretty picture on face
    */
    //% weight=96
    //% block="explode"
    //% group="Action"   
    export function explode() {
        let timer = 5
        for (let index = 0; index <= timer; index++) {
            led.plot(2, 2)
            BitKit.setMotormoduleSpeed(-255, 255)
            strip.showColor(neopixel.colors(NeoPixelColors.Red))
            basic.pause((timer - index) * 40)
            strip.showColor(neopixel.colors(NeoPixelColors.Orange))
            basic.pause((timer - index) * 40)
            basic.clearScreen()
            BitKit.setMotormoduleSpeed(255, -255)
            strip.showColor(neopixel.colors(NeoPixelColors.Yellow))
            basic.pause((timer - index) * 40)
            strip.showColor(neopixel.colors(NeoPixelColors.White))
            basic.pause((timer - index) * 40)
        }
        BitKit.setMotormoduleSpeed(0, 0);
        music.playTone(988, 100);
    }

    /**
    * Red light on coral
    * mimic the colour of the ground under the bot.
    * eg. see red, show red, see blue, show blue
    */
    //% weight=96
    //% blockId=if_there_is_coral block="if there is coral, then show |%colour"
    //% group="Action"
    export function IfThereIsCoral(colour: NeoPixelColors) {
        for (let index = 0; index < 2; index++) { //do it twice so it actually triggers
            if (BitKit.wasColorTriggered(ColorEvent.R)) {
                strip.showColor(colour)
            }
            basic.pause(250)
        }
        clearAll()
        basic.clearScreen()
    }

    /**
    * Red light and sound on coral
    * mimic the colour of the ground under the bot.
    * eg. see red, show red, see blue, show blue
    */
    //% weight=96
    //% blockId=if_there_is_coral_and block="if there is coral, then show |%colour and play sound"
    //% group="Action"
    export function IfThereIsCoralAnd(colour: NeoPixelColors) {
        let flag = 1
        for (let index = 0; index < 2; index++) { //do twice so the event actually triggers
            if (BitKit.wasColorTriggered(ColorEvent.R)) {
                strip.showColor(colour)
                if (flag == 1) { //make sure tone only plays once
                    music.playTone(Note.G, 1000)
                    flag = 0
                }
            }
            basic.pause(250)
        }
        clearAll()
        basic.clearScreen()
    }

    /**
    * Show red
    */
    //% weight=96
    //% block="show red"
    //% group="Colours"
    function showRed() { //legacy function, no block for it
        strip.showColor(NeoPixelColors.Red)
    }

    /**
    * Clear red
    * mimic the colour of the ground under the bot.
    * eg. see red, show red, see blue, show blue
    */
    //% weight=96
    //% block="clear all"
    //% group="Colours"
    export function clearAll() {
        strip.clear()
        strip.show()
    }

    /**
    * Show any
    * mimic the colour of the ground under the bot.
    * eg. see red, show red, see blue, show blue
    */
    //% weight=96
    //% block="show |%colour"
    //% group="Colours"
    export function showAny(colour: NeoPixelColors) {
        strip.showColor(colour)
    }
}