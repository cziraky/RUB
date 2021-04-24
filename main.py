def my_function():
    rub.set_led_color(0xFF0000)
    rub.position_servo(servoPos.SWITCHED, servoSpeed.VERY_FAST)
rub.on_switch_event(RubEvents.ON, my_function)

def my_function2():
    rub.position_servo(servoPos.CLOSED, servoSpeed.FAST)
    basic.pause(300)
    rub.set_led_color(0x00FFFF)
rub.on_switch_event(RubEvents.OFF, my_function2)

rub.set_led_color(0xFFFFFF)
rub.set_servo_presets(75, 110, 160)
rub.position_servo(servoPos.CLOSED, servoSpeed.VERY_FAST)
rub.set_led_color(0x00FFFF)

def on_forever():
    pass
basic.forever(on_forever)
