/**
 * Lights Blocks
 */
//% weight=48 color=#ff9f1f icon="\uf0e7" block="Lights"
//% groups=['Colours', 'Actions']
namespace lights {
    let strip = newopixel.create(DigitalPin.P1, 4, NewoPixelMode.RGB)

    /**
    * Show red
    */
    //% weight=0
    //% block="show red"
    //% group="Colours"
    function showRed() { //legacy function, no block for it
        strip.showColor(NewoPixelColors.Red)
    }

    /**
    * Clear red
    * mimic the colour of the ground under the bot.
    * eg. see red, show red, see blue, show blue
    */
    //% weight=90
    //% block="clear lights"
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
    //% weight=100
    //% block="show |%colour"
    //% group="Colours"
    export function showAny(colour: NewoPixelColors) {
        strip.showColor(colour)
    }

    /**
    * Make explosion movement and sound
    * rattle motors, make noise on speaker, show pretty picture on face
    */
    //% weight=40
    //% block="explode"
    //% group="Actions" 
    //% advanced=true  
    export function explode() {
        let timer = 5
        for (let index = 0; index <= timer; index++) {
            led.plot(2, 2)
            BitKit.setMotormoduleSpeed(-255, 255)
            strip.showColor(newopixel.colors(NewoPixelColors.Red))
            basic.pause((timer - index) * 40)
            strip.showColor(newopixel.colors(NewoPixelColors.Orange))
            basic.pause((timer - index) * 40)
            basic.clearScreen()
            BitKit.setMotormoduleSpeed(255, -255)
            strip.showColor(newopixel.colors(NewoPixelColors.Yellow))
            basic.pause((timer - index) * 40)
            strip.showColor(newopixel.colors(NewoPixelColors.White))
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
    //% weight=60
    //% blockId=if_there_is_coral block="if there is coral, then show |%colour"
    //% group="Actions"
    export function IfThereIsCoral(colour: NewoPixelColors) {
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
    //% weight=50
    //% blockId=if_there_is_coral_and block="if there is coral, then show |%colour and play sound"
    //% group="Actions"
    export function IfThereIsCoralAnd(colour: NewoPixelColors) {
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
    * Waddle left
    * Give kids something to explore other than music tab.
    * As a block, gives pseudo holonomic movement
    */
    //% advanced = true
    //% block = "waddleLeft"
    //% weight= 50
    export function waddleLeft() {
        strip.showColor(newopixel.colors(NewoPixelColors.Green))
        basic.showLeds(`
            . . # . .
            . # . . .
            # # # # #
            . # . . .
            . . # . .
            `)
        for (let i = 0; i < 6; i++) {
            BitKit.setMotormoduleSpeed(0, 255)
            basic.pause(500)
            BitKit.setMotormoduleSpeed(255, 0)
            basic.pause(500)
            BitKit.setMotormoduleSpeed(0, -255)
            basic.pause(500)
            BitKit.setMotormoduleSpeed(-255, 0)
            basic.pause(500)
        }
        BitKit.setMotormoduleSpeed(0, 0)
        basic.clearScreen()
        clearAll()
    }
}
