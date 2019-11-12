var firebaseConfig = {
    apiKey: "AIzaSyB1puL4-EDhFewCKScVxUQXQVJBN51zLxQ",
    authDomain: "wotdomotica.firebaseapp.com",
    databaseURL: "https://wotdomotica.firebaseio.com",
    projectId: "wotdomotica",
    storageBucket: "wotdomotica.appspot.com",
    messagingSenderId: "574102982862",
    appId: "1:574102982862:web:bc2bb5d1473f4ba0e6409f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

//GET BUTTONS
let lightsButton = document.getElementById('lights');
let plugsButton = document.getElementById('plugs');
let frontdoorButton = document.getElementById('frontdoor');
let backdoorButton = document.getElementById('backdoor');

//GET ICON DIVS
let lightsIcon = document.querySelector('.lighticon');
let plugsIcon = document.querySelector('.plugicon');
let frontdoorIcon = document.querySelector('.fronticon');
let backdoorIcon = document.querySelector('.backicon');



//MAKE FIREBASE REFFERENCES
let lightsRef = firebase.database().ref("lights")
let plugsRef = firebase.database().ref("plugs")
let frontdoorRef = firebase.database().ref("frontdoor")
let backdoorRef = firebase.database().ref("backdoor")
let alertRef = firebase.database().ref("alert")
let tempRef = firebase.database().ref("temp")
let humidRef = firebase.database().ref("humid")

const Alarm = (e) =>{
    let audio = new Audio('assets/alarm.mp3')
    if(document.getElementById('alertButton').classList.contains('alarm')){
        document.getElementById('alertButton').classList.remove('alarm')
        document.getElementById('alertButton').classList.add('noalarm')
        alertRef.set(false);
    }else{
        document.getElementById('alertButton').classList.remove('noalarm')
        document.getElementById('alertButton').classList.add('alarm')
        alertRef.set(true);
        audio.play();
    }
    
}
document.getElementById('alertButton').addEventListener('click', Alarm);
//Toggle method to remove or add classes
const Toggle = (e) => {
    console.log(e.currentTarget.id);
    if(e.currentTarget.classList.contains(e.currentTarget.id + 'active')){
        e.currentTarget.classList.remove(e.currentTarget.id + 'active');
        e.currentTarget.classList.add(e.currentTarget.id + 'dorment');
        firebase.database().ref(e.currentTarget.id).set(false);
    }else{
        e.currentTarget.classList.add(e.currentTarget.id + 'active');
        e.currentTarget.classList.remove(e.currentTarget.id + 'dorment');
        firebase.database().ref(e.currentTarget.id).set(true);
    }   
}
//show temp/humid
const measurements = () =>{
    tempRef.on('value', (snapshot) => {
        document.getElementById('temp').innerHTML = snapshot.val()
    })
    humidRef.on('value', (snapshot) => {
        document.getElementById('humid').innerHTML = snapshot.val()
    })
    
}
// Function to check what is active and what is not
const checkActive = () => {
    lightsRef.on('value', (snapshot) => {
        if(snapshot.val()){
            lightsIcon.innerHTML = '<i class="far fa-lightbulb"></i>';            lightsButton.classList.add('lightsactive');
        }else{
             lightsIcon.innerHTML = '<i class="fas fa-low-vision"></i>';
             lightsButton.classList.add('lightsdorment');
        }
    })
    plugsRef.on('value', (snapshot) => {
        if(snapshot.val()){
            plugsIcon.innerHTML = '<i class="fas fa-plug"></i>'
            plugsButton.classList.add('plugsactive');
        }else{
            plugsIcon.innerHTML = '<i class="fas fa-power-off"></i>'
            plugsButton.classList.add('plugsdorment');
        }
    })
    frontdoorRef.on('value', (snapshot) => {
        if(snapshot.val()){
            frontdoorIcon.innerHTML ='<i class="fas fa-door-open"></i>'
            frontdoorButton.classList.add('frontdooractive');
        }else{
            frontdoorIcon.innerHTML ='<i class="fas fa-door-closed"></i>'
            frontdoorButton.classList.add('frontdoordorment');
        }
    })
    backdoorRef.on('value', (snapshot) => {
        if(snapshot.val()){
            backdoorIcon.innerHTML ='<i class="fas fa-door-open"></i>'
            backdoorButton.classList.add('backdooractive');
        }else{
            backdoorIcon.innerHTML ='<i class="fas fa-door-closed"></i>'
            backdoorButton.classList.add('backdoordorment');
        }
    })
}
measurements();
checkActive();

//Link Toggle method ot buttons
lightsButton.addEventListener('click', Toggle)
plugsButton.addEventListener('click', Toggle)
frontdoorButton.addEventListener('click', Toggle)
backdoorButton.addEventListener('click', Toggle)

