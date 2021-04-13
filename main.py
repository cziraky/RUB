interacting = False

def set_emotion(emotion):
    basic.show_icon(emotion)

def on_startup():
    rub.led_brightness(0)
    set_emotion(IconNames.HAPPY)
    soundExpression.hello.play()
    rub.set_led_color(0xFFFFFF)
    for lb in range(0, 255, 10):
        rub.led_brightness(lb)
        basic.pause(10)
    soundExpression.giggle.play()
    rub.set_servo_presets(75, 110, 160)
    rub.position_servo(servoPos.CLOSED, servoSpeed.VERY_FAST)
    rub.set_led_color(0x00FFFF)

def my_function():
    global interacting
    rub.led_brightness(255)
    rub.set_led_color(0xFF0000)
    set_emotion(IconNames.CONFUSED)
    interacting = True
    rub.position_servo(servoPos.SWITCHED, servoSpeed.VERY_FAST)
    soundExpression.slide.play()
    interacting = False
rub.on_switch_event(RubEvents.ON, my_function)

def my_function2():
    global interacting
    rub.led_brightness(255)
    rub.set_led_color(0x00FFFF)
    set_emotion(IconNames.ANGRY)
    interacting = True
    rub.position_servo(servoPos.CLOSED, servoSpeed.FAST)
    basic.pause(300)
    interacting = False
rub.on_switch_event(RubEvents.OFF, my_function2)

on_startup()

def on_forever():
    global interacting
    if interacting == False:
        set_emotion(IconNames.HAPPY)
        for lb in range(0, 255, 10):
            rub.led_brightness(lb)
            rub.led_rainbow()
            basic.pause(10)
        set_emotion(IconNames.SILLY)
        for lb in range(0, 255, 10):
            rub.led_brightness(255 - lb)
            rub.led_rainbow()
            basic.pause(10)

basic.forever(on_forever)
