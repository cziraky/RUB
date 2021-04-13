init = True
interacting = False
asleep = False
magnetic_focres = (
    input.magnetic_force(Dimension.X),
    input.magnetic_force(Dimension.Y),
    input.magnetic_force(Dimension.Z)
)

def set_emotion(emotion):
    basic.show_icon(emotion)

def on_startup():
    global init, asleep
    init = True
    asleep = False
    input.set_sound_threshold(SoundThreshold.LOUD)
    for lb in range(0, 255, 10):
        rub.led_brightness(lb)
        rub.set_led_color(0xFFFFFF)
        basic.pause(10)
    set_emotion(IconNames.HAPPY)
    soundExpression.hello.play()
    basic.pause(1500)
    rub.set_servo_presets(75, 110, 160)
    rub.position_servo(servoPos.CLOSED, servoSpeed.VERY_FAST)
    for lb in range(0, 255, 10):
        rub.led_brightness(255 - lb)
        rub.set_led_color(0x00FFFF)
        basic.pause(10)
    init = False

def turned_on():
    global interacting, asleep
    interacting = True
    asleep = False
#    rub.led_brightness(255)
#    rub.set_led_color(0xFF0000)
    set_emotion(IconNames.CONFUSED)
    rub.position_servo(servoPos.SWITCHED, servoSpeed.VERY_FAST)
#    soundExpression.slide.play()
    rub.wait_servo()
    interacting = False

def turned_off():
    global interacting, asleep
    interacting = True
    asleep = False
#    rub.led_brightness(255)
#    rub.set_led_color(0x00FFFF)
    set_emotion(IconNames.ANGRY)
    rub.position_servo(servoPos.CLOSED, servoSpeed.FAST if Math.random_boolean() else servoSpeed.VERY_FAST)
    rub.wait_servo()
    basic.pause(300)
    interacting = False

def touched():
    global interacting, asleep
    interacting = True
    asleep = False
#    rub.led_brightness(255)
#    rub.set_led_color(0xFF0000)
    set_emotion(IconNames.ANGRY)
    basic.pause(10)
    rub.position_servo(servoPos.OPEN, servoSpeed.FAST)
#    soundExpression.mysterious.play()
    basic.pause(3000)
    rub.position_servo(servoPos.CLOSED, servoSpeed.MEDIUM)
#    rub.led_brightness(50)
#    rub.set_led_color(0xFF0000)
#    set_emotion(IconNames.SAD)
    basic.pause(200)
    if Math.random_boolean():
#        rub.led_brightness(255)
#        rub.set_led_color(0xFF0000)
#        set_emotion(IconNames.ANGRY)
        rub.position_servo(servoPos.OPEN, servoSpeed.FAST)
        basic.pause(1500)
        rub.position_servo(servoPos.CLOSED, servoSpeed.MEDIUM)
#        rub.led_brightness(50)
#        rub.set_led_color(0xFF0000)
        basic.pause(200)

    interacting = False

def on_sound_loud():
    global interacting, asleep
    interacting = True
    asleep = False
#    rub.led_brightness(255)
#    rub.set_led_color(0xFFFFFF)
    set_emotion(IconNames.SURPRISED)
    rub.position_servo(servoPos.CLOSED, servoSpeed.VERY_FAST)
#   soundExpression.sad.play()
    basic.pause(3000)
    interacting = False

def logo_pressed():
    global asleep
    asleep = False

def magnetic_force_changed(threshold):
    temp_magnetic_forces = (
        input.magnetic_force(Dimension.X),
        input.magnetic_force(Dimension.Y),
        input.magnetic_force(Dimension.Z)
    )

    if Math.max(magnetic_focres[0], temp_magnetic_forces[0]) - Math.min(magnetic_focres[0], temp_magnetic_forces[0]) > threshold:
        return True
    elif Math.max(magnetic_focres[1], temp_magnetic_forces[1]) - Math.min(magnetic_focres[1], temp_magnetic_forces[1]) > threshold:
        return True
    elif Math.max(magnetic_focres[2], temp_magnetic_forces[2]) - Math.min(magnetic_focres[2], temp_magnetic_forces[2]) > threshold:
        return True
    else:
        return False

rub.on_switch_event(RubEvents.ON, turned_on)
rub.on_switch_event(RubEvents.OFF, turned_off)
input.on_sound(DetectedSound.LOUD, on_sound_loud)
input.on_gesture(Gesture.SHAKE, touched)
input.on_logo_event(TouchButtonEvent.PRESSED, logo_pressed)

on_startup()

def on_forever():
    global interacting, init, asleep, magnetic_focres

    if interacting == False and init == False:
        if not asleep:
            for sc in range(3):
                set_emotion(IconNames.HEART)
                for lb in range(0, 255, 10):
                    rub.led_brightness(lb)
                    rub.led_rainbow()
                    basic.pause(30)
                for lb in range(0, 255, 10):
                    rub.led_brightness(255 - lb)
                    rub.led_rainbow()
                    basic.pause(30)
                asleep = True
        else:
            set_emotion(IconNames.ASLEEP)
            for lb in range(0, 255, 10):
                magnetic_force_changed(5)
                rub.led_brightness(lb)
                rub.led_rainbow()
                basic.pause(100)
            for lb in range(0, 255, 10):
                magnetic_force_changed(5)
                rub.led_brightness(255 - lb)
                rub.led_rainbow()
                basic.pause(100)

basic.forever(on_forever)
