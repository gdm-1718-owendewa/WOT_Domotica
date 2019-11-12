from sense_hat import SenseHat
import sys
import os
import pyrebase
import time
import random
sense = SenseHat()

config = {
	"apiKey": "AIzaSyB1puL4-EDhFewCKScVxUQXQVJBN51zLxQ",
    "authDomain": "wotdomotica.firebaseapp.com",
    "databaseURL": "https://wotdomotica.firebaseio.com",
    "projectId": "wotdomotica",
    "storageBucket": "wotdomotica.appspot.com",
    "messagingSenderId": "574102982862",
}
firebase = pyrebase.initialize_app(config)
db = firebase.database()


def pixel(x,y,color):
	sense.set_pixel(x,y,color)	
def light():
	active = [255,255,0]
	noneactive = [155,155,12]
	if(lights):
		pixel(0,2,active)
		pixel(0,5,active)
		pixel(5,2,active)
		pixel(5,5,active)
	else:
		pixel(0,2,noneactive)
		pixel(0,5,noneactive)
		pixel(5,2,noneactive)
		pixel(5,5,noneactive)		
def plug():
	active = [30,144,255]
	noneactive = [0,0,139]
	if(plugs):
		pixel(3,0,active)
		pixel(3,7,active)
		pixel(7,4,active)
		pixel(7,3,active)
	else:
		pixel(3,0,noneactive)
		pixel(3,7,noneactive)
		pixel(7,4,noneactive)
		pixel(7,3,noneactive)
def front():
	active = [0,255,0]
	noneactive = [255,0,0]
	if(frontdoor or alert):
		pixel(7,7,active)
		pixel(6,7,active)
		pixel(5,7,active)
		
	else:
		pixel(7,7,noneactive)
		pixel(6,7,noneactive)
		pixel(5,7,noneactive)
		
def back():
	active = [0,255,0]
	noneactive = [255,0,0]
	if(backdoor or alert):
		pixel(7,0,active)
		pixel(6,0,active)
		pixel(5,0,active)
		
	else:
		pixel(7,0,noneactive)
		pixel(6,0,noneactive)
		pixel(5,0,noneactive)
					
def measure():
	temp = sense.get_temperature()
	humid = sense.get_humidity()
	db.child("temp").set(round(temp))
	db.child("humid").set(round(humid))

try:
	while True:
		lights = db.child('lights').get().val()
		plugs = db.child('plugs').get().val()
		frontdoor = db.child('frontdoor').get().val()
		backdoor = db.child('backdoor').get().val()
		alert = db.child('alert').get().val()
		if(alert == true):
			print 'alarm'
			measure()
			front()
			light()
			plug()
			back()
			print 'pushed to database'
			time.sleep(1)	
except (KeyboardInterrupt, SystemExit):
	sense.clear()
	print('\n' + 'Stopped AvatarUI')
	sys.exit(0)
