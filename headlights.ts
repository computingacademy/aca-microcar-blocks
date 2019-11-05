/**
 * Headlights Blocks
 */
//% weight=48 color=#ffb612 icon="\uf0e7" block="Headlights"
//% groups="['Action', 'Colours']"
namespace headlights {
    let strip = neopixel.create(DigitalPin.P1, 4, NeoPixelMode.RGB)
    
    /**
    * Make explosion movement and sound
    * rattle motors, make noise on speaker, show pretty picture on face
    */
    //% weight=96
    //% block="EXPLODE"
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
    export function IfThereIsCoral(colour: ColorEvent) {
        for (let index = 0; index < 2; index++) {
            if (BitKit.wasColorTriggered(colour)) {
                if (colour == 2) {
                    strip.showColor(NeoPixelColors.Red)
                }
                else if (colour = 3) {
                    strip.showColor(NeoPixelColors.Green)
                }
                else if (colour = 4) {
                    strip.showColor(NeoPixelColors.Blue)
                }
            }
            basic.pause(250)
        }
        clearRed()
        basic.clearScreen()
    }

    /**
    * Red light and sound on coral
    * mimic the colour of the ground under the bot.
    * eg. see red, show red, see blue, show blue
    */
    //% weight=96
    //% blockId=if_there_is_coral_and block="if there is coral, then show |%colour and play sound"
    //% group="Grid"
    export function IfThereIsCoralAnd(colour: ColorEvent) {
        for (let index = 0; index < 2; index++) {
            if (BitKit.wasColorTriggered(colour)) {
                if (colour == 2) {
                    strip.showColor(NeoPixelColors.Red)
                }
                else if (colour = 3) {
                    strip.showColor(NeoPixelColors.Green)
                }
                music.playTone(Note.C, 1000)
            }
            basic.pause(250)
        }
        clearRed()
        basic.clearScreen()
    }

    /**
    * Show red
    */
    //% weight=96
    //% block="show red"
    //% group="Colours"
    export function showRed() {
        strip.showColor(NeoPixelColors.Red)
    }

    /**
    * Clear red
    * mimic the colour of the ground under the bot.
    * eg. see red, show red, see blue, show blue
    */
    //% weight=96
    //% block="clear red"
    //% group="Colours"
    export function clearRed() {
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
    export function showAny(colour: ColorEvent) {
        if (colour == ColorEvent.G){
            strip.showColor(NeoPixelColors.Green)
        }
    }

}