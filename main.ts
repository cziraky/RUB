rub.onSwitchEvent(RubEvents.On, function () {
    rub.setLedColor(0xFF0000)
    rub.positionServo(servoPos.Switched, servoSpeed.VeryFast)
})
rub.onSwitchEvent(RubEvents.Off, function () {
    rub.positionServo(servoPos.Closed, servoSpeed.Fast)
    basic.pause(300)
    rub.setLedColor(0x00FFFF)
})
rub.setLedColor(0xFFFFFF)
rub.setServoPresets(75, 110, 160)
rub.positionServo(servoPos.Closed, servoSpeed.VeryFast)
rub.setLedColor(0x00FFFF)
basic.forever(function () {
	
})
