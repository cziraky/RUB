init = True
interacting = False

def set_emotion(emotion):
    basic.show_icon(emotion)

def on_startup():
    global init
    init = True
    input.set_sound_threshold(SoundThreshold.LOUD)
    for lb in range(0, 255, 10):
        rub.led_brightness(lb)
        rub.set_led_color(0xFFFFFF)
        basic.pause(10)
    set_emotion(IconNames.HAPPY)
    soundExpression.hello.play()
    basic.pause(3000)
    rub.set_servo_presets(75, 110, 160)
    rub.position_servo(servoPos.CLOSED, servoSpeed.VERY_FAST)
    rub.set_led_color(0x00FFFF)
    init = False

def turned_on():
    global interacting
    interacting = True
#    rub.led_brightness(255)
#    rub.set_led_color(0xFF0000)
    set_emotion(IconNames.CONFUSED)
    rub.position_servo(servoPos.SWITCHED, servoSpeed.VERY_FAST)
#    soundExpression.slide.play()
    rub.wait_servo()
    interacting = False

def turned_off():
    global interacting
    interacting = True
#    rub.led_brightness(255)
#    rub.set_led_color(0x00FFFF)
    set_emotion(IconNames.ANGRY)
    rub.position_servo(servoPos.CLOSED, servoSpeed.FAST if Math.random_boolean() else servoSpeed.VERY_FAST)
    rub.wait_servo()
    basic.pause(300)
    interacting = False

def touched():
    global interacting
    interacting = True
    rub.led_brightness(255)
    rub.set_led_color(0x00FFFF)
    set_emotion(IconNames.ANGRY)
    rub.position_servo(servoPos.OPEN, servoSpeed.FAST)
#    soundExpression.mysterious.play()
    basic.pause(5000)
    rub.position_servo(servoPos.CLOSED, servoSpeed.MEDIUM)
    interacting = False

def on_sound_loud():
    global interacting
    interacting = True
    rub.led_brightness(255)
    rub.set_led_color(0xFFFFFF)
    set_emotion(IconNames.SURPRISED)
    rub.position_servo(servoPos.CLOSED, servoSpeed.VERY_FAST)
#   soundExpression.sad.play()
    basic.pause(3000)
    interacting = False

rub.on_switch_event(RubEvents.ON, turned_on)
rub.on_switch_event(RubEvents.OFF, turned_off)
input.on_sound(DetectedSound.LOUD, on_sound_loud)
input.on_gesture(Gesture.SHAKE, touched)

on_startup()

def on_forever():
    global interacting
    if interacting == False and init == False:
        set_emotion(IconNames.ASLEEP)
        for lb in range(0, 255, 10):
            rub.led_brightness(lb)
            rub.led_rainbow()
            basic.pause(10)
        for lb in range(0, 255, 10):
            rub.led_brightness(255 - lb)
            rub.led_rainbow()
            basic.pause(10)

basic.forever(on_forever)
