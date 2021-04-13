let init = true
let interacting = false
function set_emotion(emotion: number) {
    basic.showIcon(emotion)
}

function on_startup() {
    
    init = true
    input.setSoundThreshold(SoundThreshold.Loud)
    for (let lb = 0; lb < 255; lb += 10) {
        rub.ledBrightness(lb)
        rub.setLedColor(0xFFFFFF)
        basic.pause(10)
    }
    set_emotion(IconNames.Happy)
    soundExpression.hello.play()
    basic.pause(3000)
    rub.setServoPresets(75, 110, 160)
    rub.positionServo(servoPos.Closed, servoSpeed.VeryFast)
    rub.setLedColor(0x00FFFF)
    init = false
}

rub.onSwitchEvent(RubEvents.On, function turned_on() {
    
    interacting = true
    //     rub.led_brightness(255)
    //     rub.set_led_color(0xFF0000)
    set_emotion(IconNames.Confused)
    rub.positionServo(servoPos.Switched, servoSpeed.VeryFast)
    //     soundExpression.slide.play()
    rub.waitServo()
    interacting = false
})
rub.onSwitchEvent(RubEvents.Off, function turned_off() {
    
    interacting = true
    //     rub.led_brightness(255)
    //     rub.set_led_color(0x00FFFF)
    set_emotion(IconNames.Angry)
    rub.positionServo(servoPos.Closed, Math.randomBoolean() ? servoSpeed.Fast : servoSpeed.VeryFast)
    rub.waitServo()
    basic.pause(300)
    interacting = false
})
input.onSound(DetectedSound.Loud, function on_sound_loud() {
    
    interacting = true
    rub.ledBrightness(255)
    rub.setLedColor(0xFFFFFF)
    set_emotion(IconNames.Surprised)
    rub.positionServo(servoPos.Closed, servoSpeed.VeryFast)
    //    soundExpression.sad.play()
    basic.pause(3000)
    interacting = false
})
input.onGesture(Gesture.Shake, function touched() {
    
    interacting = true
    rub.ledBrightness(255)
    rub.setLedColor(0xFF0000)
    set_emotion(IconNames.Angry)
    basic.pause(10)
    rub.positionServo(servoPos.Open, servoSpeed.Fast)
    //     soundExpression.mysterious.play()
    basic.pause(3000)
    rub.ledBrightness(50)
    rub.setLedColor(0xFF0000)
    set_emotion(IconNames.Sad)
    rub.positionServo(servoPos.Closed, servoSpeed.Medium)
    basic.pause(200)
    if (Math.randomBoolean()) {
        rub.ledBrightness(255)
        rub.setLedColor(0xFF0000)
        set_emotion(IconNames.Angry)
        rub.positionServo(servoPos.Open, servoSpeed.Fast)
        basic.pause(1500)
        rub.positionServo(servoPos.Closed, servoSpeed.Medium)
        basic.pause(200)
    }
    
    interacting = false
})
on_startup()
basic.forever(function on_forever() {
    let lb: number;
    
    if (interacting == false && init == false) {
        set_emotion(IconNames.Asleep)
        for (lb = 0; lb < 255; lb += 10) {
            rub.ledBrightness(lb)
            rub.ledRainbow()
            basic.pause(50)
        }
        for (lb = 0; lb < 255; lb += 10) {
            rub.ledBrightness(255 - lb)
            rub.ledRainbow()
            basic.pause(50)
        }
    }
    
})
