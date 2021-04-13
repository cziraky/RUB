play_sound_expressions = {
    'hello': soundExpression.hello.play(),
    'slide': soundExpression.slide.play(),
    'giggle': soundExpression.giggle.play(),
    'soaring': soundExpression.soaring.play(),
    'sad': soundExpression.sad.play()
}

def set_emotion(emotion):
    basic.show_icon(emotion)

def play_sound(expression):
    play_sound_expressions['hello']

def on_startup():
    set_emotion(IconNames.HAPPY)
    play_sound('hello')
    rub.led_brightness(0)
    rub.set_led_color(0xFFFFFF)
    for lb in range(255):
        rub.led_brightness(lb)
        rub.led_rainbow()
        basic.pause(20)
    play_sound('giigle')
    rub.set_servo_presets(75, 110, 160)
    rub.position_servo(servoPos.CLOSED, servoSpeed.VERY_FAST)
    rub.set_led_color(0x00FFFF)

def my_function():
    rub.set_led_color(0xFF0000)
    rub.position_servo(servoPos.SWITCHED, servoSpeed.VERY_FAST)
rub.on_switch_event(RubEvents.ON, my_function)

def my_function2():
    rub.position_servo(servoPos.CLOSED, servoSpeed.FAST)
    basic.pause(300)
    rub.set_led_color(0x00FFFF)
rub.on_switch_event(RubEvents.OFF, my_function2)

def rainbow_led():
    for index in range(255):
        for index2 in range(255):
            for index3 in range(255):
                rub.set_led_color(0xff0000)
led_colors = [0, 16711680, 65280, 255, 16711680, 65280]
on_startup()

def on_forever():
    pass
basic.forever(on_forever)
