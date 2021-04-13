def my_function():
    rub.position_servo(servoPos.SWITCHED, servoSpeed.VERY_SLOW)
rub.on_switch_event(RubEvents.ON, my_function)

def my_function2():
    rub.position_servo(servoPos.CLOSED, servoSpeed.VERY_SLOW)
rub.on_switch_event(RubEvents.OFF, my_function2)

rub.position_servo(servoPos.CLOSED, servoSpeed.VERY_FAST)

def on_forever():
    pass
basic.forever(on_forever)
