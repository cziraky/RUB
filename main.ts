let init = true
let interacting = false
let asleep = false
let magnetic_focres = [input.magneticForce(Dimension.X), input.magneticForce(Dimension.Y), input.magneticForce(Dimension.Z)]
function set_emotion(emotion: number) {
    basic.showIcon(emotion)
}

function on_startup() {
    let lb: number;
    
    init = true
    asleep = false
    input.setSoundThreshold(SoundThreshold.Loud)
    for (lb = 0; lb < 255; lb += 10) {
        rub.ledBrightness(lb)
        rub.setLedColor(0xFFFFFF)
        basic.pause(10)
    }
    set_emotion(IconNames.Happy)
    soundExpression.hello.play()
    basic.pause(1500)
    rub.setServoPresets(75, 110, 160)
    rub.positionServo(servoPos.Closed, servoSpeed.VeryFast)
    for (lb = 0; lb < 255; lb += 10) {
        rub.ledBrightness(255 - lb)
        rub.setLedColor(0x00FFFF)
        basic.pause(10)
    }
    init = false
}

function magnetic_force_changed(threshold: number): boolean {
    let temp_magnetic_forces = [input.magneticForce(Dimension.X), input.magneticForce(Dimension.Y), input.magneticForce(Dimension.Z)]
    if (Math.max(magnetic_focres[0], temp_magnetic_forces[0]) - Math.min(magnetic_focres[0], temp_magnetic_forces[0]) > threshold) {
        return true
    } else if (Math.max(magnetic_focres[1], temp_magnetic_forces[1]) - Math.min(magnetic_focres[1], temp_magnetic_forces[1]) > threshold) {
        return true
    } else if (Math.max(magnetic_focres[2], temp_magnetic_forces[2]) - Math.min(magnetic_focres[2], temp_magnetic_forces[2]) > threshold) {
        return true
    } else {
        return false
    }
    
}

rub.onSwitchEvent(RubEvents.On, function turned_on() {
    
    interacting = true
    asleep = false
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
    asleep = false
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
    asleep = false
    //     rub.led_brightness(255)
    //     rub.set_led_color(0xFFFFFF)
    set_emotion(IconNames.Surprised)
    rub.positionServo(servoPos.Closed, servoSpeed.VeryFast)
    //    soundExpression.sad.play()
    basic.pause(3000)
    interacting = false
})
input.onGesture(Gesture.Shake, function touched() {
    
    interacting = true
    asleep = false
    //     rub.led_brightness(255)
    //     rub.set_led_color(0xFF0000)
    set_emotion(IconNames.Angry)
    basic.pause(10)
    rub.positionServo(servoPos.Open, servoSpeed.Fast)
    //     soundExpression.mysterious.play()
    basic.pause(3000)
    rub.positionServo(servoPos.Closed, servoSpeed.Medium)
    //     rub.led_brightness(50)
    //     rub.set_led_color(0xFF0000)
    //     set_emotion(IconNames.SAD)
    basic.pause(200)
    if (Math.randomBoolean()) {
        //         rub.led_brightness(255)
        //         rub.set_led_color(0xFF0000)
        //         set_emotion(IconNames.ANGRY)
        rub.positionServo(servoPos.Open, servoSpeed.Fast)
        basic.pause(1500)
        rub.positionServo(servoPos.Closed, servoSpeed.Medium)
        //         rub.led_brightness(50)
        //         rub.set_led_color(0xFF0000)
        basic.pause(200)
    }
    
    interacting = false
})
input.onLogoEvent(TouchButtonEvent.Pressed, function logo_pressed() {
    
    asleep = false
})
on_startup()
basic.forever(function on_forever() {
    let lb: number;
    
    if (interacting == false && init == false) {
        if (!asleep) {
            for (let sc = 0; sc < 3; sc++) {
                set_emotion(IconNames.Heart)
                for (lb = 0; lb < 255; lb += 10) {
                    rub.ledBrightness(lb)
                    rub.ledRainbow()
                    basic.pause(30)
                }
                for (lb = 0; lb < 255; lb += 10) {
                    rub.ledBrightness(255 - lb)
                    rub.ledRainbow()
                    basic.pause(30)
                }
                asleep = true
            }
        } else {
            set_emotion(IconNames.Asleep)
            for (lb = 0; lb < 255; lb += 10) {
                magnetic_force_changed(5)
                rub.ledBrightness(lb)
                rub.ledRainbow()
                basic.pause(100)
            }
            for (lb = 0; lb < 255; lb += 10) {
                magnetic_force_changed(5)
                rub.ledBrightness(255 - lb)
                rub.ledRainbow()
                basic.pause(100)
            }
        }
        
    }
    
})
