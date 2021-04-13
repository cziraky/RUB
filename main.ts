let interacting = false
function set_emotion(emotion: number) {
    basic.showIcon(emotion)
}

function on_startup() {
    rub.ledBrightness(0)
    set_emotion(IconNames.Happy)
    soundExpression.hello.play()
    rub.setLedColor(0xFFFFFF)
    for (let lb = 0; lb < 255; lb += 10) {
        rub.ledBrightness(lb)
        basic.pause(10)
    }
    soundExpression.giggle.play()
    rub.setServoPresets(75, 110, 160)
    rub.positionServo(servoPos.Closed, servoSpeed.VeryFast)
    rub.setLedColor(0x00FFFF)
}

rub.onSwitchEvent(RubEvents.On, function my_function() {
    
    rub.ledBrightness(255)
    rub.setLedColor(0xFF0000)
    set_emotion(IconNames.Confused)
    interacting = true
    rub.positionServo(servoPos.Switched, servoSpeed.VeryFast)
    soundExpression.slide.play()
    interacting = false
})
rub.onSwitchEvent(RubEvents.Off, function my_function2() {
    
    rub.ledBrightness(255)
    rub.setLedColor(0x00FFFF)
    set_emotion(IconNames.Angry)
    interacting = true
    rub.positionServo(servoPos.Closed, servoSpeed.Fast)
    basic.pause(300)
    interacting = false
})
on_startup()
basic.forever(function on_forever() {
    let lb: number;
    
    if (interacting == false) {
        set_emotion(IconNames.Happy)
        for (lb = 0; lb < 255; lb += 10) {
            rub.ledBrightness(lb)
            rub.ledRainbow()
            basic.pause(10)
        }
        set_emotion(IconNames.Silly)
        for (lb = 0; lb < 255; lb += 10) {
            rub.ledBrightness(255 - lb)
            rub.ledRainbow()
            basic.pause(10)
        }
    }
    
})
