let play_sound_expressions = {
    "hello" : soundExpression.hello.play(),
    "slide" : soundExpression.slide.play(),
    "giggle" : soundExpression.giggle.play(),
    "soaring" : soundExpression.soaring.play(),
    "sad" : soundExpression.sad.play(),
}

function set_emotion(emotion: number) {
    basic.showIcon(emotion)
}

function play_sound(expression: string) {
    play_sound_expressions["hello"]
}

function on_startup() {
    set_emotion(IconNames.Happy)
    play_sound("hello")
    rub.ledBrightness(0)
    rub.setLedColor(0xFFFFFF)
    for (let lb = 0; lb < 255; lb++) {
        rub.ledBrightness(lb)
        rub.ledRainbow()
        basic.pause(20)
    }
    play_sound("giigle")
    rub.setServoPresets(75, 110, 160)
    rub.positionServo(servoPos.Closed, servoSpeed.VeryFast)
    rub.setLedColor(0x00FFFF)
}

rub.onSwitchEvent(RubEvents.On, function my_function() {
    rub.setLedColor(0xFF0000)
    rub.positionServo(servoPos.Switched, servoSpeed.VeryFast)
})
rub.onSwitchEvent(RubEvents.Off, function my_function2() {
    rub.positionServo(servoPos.Closed, servoSpeed.Fast)
    basic.pause(300)
    rub.setLedColor(0x00FFFF)
})
function rainbow_led() {
    for (let index = 0; index < 255; index++) {
        for (let index2 = 0; index2 < 255; index2++) {
            for (let index3 = 0; index3 < 255; index3++) {
                rub.setLedColor(0xff0000)
            }
        }
    }
}

let led_colors = [0, 16711680, 65280, 255, 16711680, 65280]
on_startup()
basic.forever(function on_forever() {
    
})
