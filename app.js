const firebaseConfig = {
    apiKey: "AIzaSyB9ldronoia8-wIlNjOYUblsbm-38GPqkk",
    authDomain: "circlepoppedapp.firebaseapp.com",
    projectId: "circlepoppedapp",
    storageBucket: "circlepoppedapp.appspot.com",
    messagingSenderId: "969044891557",
    appId: "1:969044891557:web:3a43a47b405c9886ecfa4c",
    measurementId: "G-RJ2WG2X7XV"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  let firebase_db = firebase.firestore();
//Register
  async function signup() {
      
    let useremail = document.getElementById('useremail').value
    let userpass = document.getElementById('userpassword').value
    try {
        await firebase.auth().createUserWithEmailAndPassword(useremail, userpass)
        
        window.location = "./login.html"
    }
    catch (error) {
      console.log(error.message)
    }
  }
  

// LoginWithGoogle
  async function googleLogin() {
    try {
    var provider = new firebase.auth.GoogleAuthProvider();
    let googleLogin = await firebase.auth().signInWithPopup(provider)
    console.log(googleLogin)
    window.location = "./profile.html"    
    }
    catch(error)
    {

       alert(error.message)

    }
}

//LoginWithEmail&Password

async function login() {
    let loggeduseremail = document.getElementById('loggeduseremail').value
    let loggeduserpass = document.getElementById('loggeduserpass').value
    try {
      let loginResult = await firebase.auth().signInWithEmailAndPassword(loggeduseremail, loggeduserpass)
      window.location = "./profile.html"
    }
    catch (error) {
      alert("Your Crediential are not valid, Kindly recheck your crediential")
  
    }
  }

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        const user = firebase.auth().currentUser;

if (user !== null) {
  user.providerData.forEach((profile) => {

    document.getElementById('display').innerText = `  Welcome  ${ profile.displayName}`;

  });
}
        console.log("ALIVE!")
    } 
    else {
      console.log("SignOUT")
    }
  });
  
  // Loggng Out

  function logout() {
    firebase.auth().signOut().then(() => {
        window.location = "./login.html"
      }).catch((error) => {
        console.log(error.message)    
    });
    
  }
  


let popped = 0;
let livescount = 3;
let chance = document.getElementById('lives')
chance.textContent = 'lives: ' + livescount;
let scorePoints = document.getElementById('score')
function removeEvent(e){
    e.target.removeEventListener('mouseover', function(){
        
    })
};

const score = ()=>{
    if (popped > 140  ){
        console.log('all popped!');
        let details = document.querySelector('#dotContainer');
        let message = document.querySelector('#completeMessage');
        details.innerHTML = '';
        message.style.display = 'block';
        chance.textContent=""
    }
};



let popGiven= document.getElementById('colorselect');

let color=['green','red','cyan','yellow','gray','green'];

let counter = 0;


let interval = setInterval(function(){
     
popGiven.textContent = `Please select  ${color[counter+1]}  color`;

console.log(color[counter])
document.addEventListener('mouseover', function(e){
    
    if (e.target.className === "balloon"){
            
           let idTarget = e.target;
           console.log(idTarget.id);
           console.log(color[counter])
      if (color[counter]=="red" &&  idTarget.id=="red"){
                score()
                e.target.style.backgroundColor = "#ededed";
                e.target.style.backgroundColor = "#ededed";
                e.target.textContent = "POP!";
                popped+=10;
                scorePoints.textContent = `Score: ${popped}`
                removeEvent(e);
        }
   else  if (color[counter]=="green" &&  idTarget.id=="green"){
                score()
         e.target.style.backgroundColor = "#ededed";
         e.target.style.backgroundColor = "#ededed";
         e.target.textContent = "POP!";
         popped+=10;
         scorePoints.textContent = `Score: ${popped}`
         removeEvent(e);
     
}
    else if (color[counter]=="cyan" &&  idTarget.id=="cyan"){
        score()
     e.target.style.backgroundColor = "#ededed";
     e.target.style.backgroundColor = "#ededed";
     e.target.textContent = "POP!";
     popped+=10;
     scorePoints.textContent = `Score: ${popped}`
     removeEvent(e);
     
}

     else if (color[counter]=="yellow" &&  idTarget.id=="yellow"){
        score()
     e.target.style.backgroundColor = "#ededed";
     e.target.style.backgroundColor = "#ededed";
     e.target.textContent = "POP!";
     popped+=10;
     scorePoints.textContent = `Score: ${popped}`
     removeEvent(e);
     
}
     else if (color[counter]=="gray" &&  idTarget.id=="gray"){
        score()
     e.target.style.backgroundColor = "#ededed";
     e.target.style.backgroundColor = "#ededed";
     e.target.textContent = "POP!";
     popped+=10;
     scorePoints.textContent = `Score: ${popped}`
     removeEvent(e);
     
}
 
      else ( 
     livescount--
     
     );
     lives.textContent = 'lives: ' + (+livescount)


    }
    }   
);



    counter++;
    if(counter == color.length || livescount < 1) {
     
        let clearScreen = document.querySelector('#dotContainer');
        clearScreen.innerHTML = '';
        clearInterval(interval);
        popGiven.textContent = 'GAME OVER'
    }
},5000)









