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
// //Register
async function signup() {
  let username = document.getElementById('username').value
  let useremail = document.getElementById('useremail').value
  let userpass = document.getElementById('userpassword').value
  //let usercontact = document.getElementById('userphnno').value
  //console.log(usercontact)
  //usercontact.toString()
  try {
      await firebase.auth().createUserWithEmailAndPassword(useremail, userpass)
      const user = await firebase.auth().currentUser
      if(user !== null)
      {
        user.updateProfile(
          {
            displayName: username,
          }
        )
      }
      console.log(user.displayName)
     window.location = "./login.html"
  }
  catch (error) {
    console.log(error.message)
  }
}

// Login
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

// // Subscriber/collection

firebase.auth().onAuthStateChanged((user) => {
  user = firebase.auth().currentUser
  if (user !== null ) {
    firebase_db.collection('users').doc(user.uid).set({
    username: user.displayName,
    userid: user.uid,
    useremail: user.email,
  
    })
    retrieveData(user)
    
  } 
  else {
    console.log("SignOUT")
  }
});

function logout() {
  firebase.auth().signOut();
  window.location = './login.html'
}

const retrieveData = (user) => {
  firebase_db.collection('users').doc(user.uid).get().then((querySnapshot) => {
      const data = querySnapshot.data();
      console.log(data)
      document.getElementById('display').innerHTML = "Welcome " + data.username
  })
}


//GAME 1 LEVEL

let popped = 0;
let livescount = 3;
let chance = document.getElementById('lives')
chance.textContent = 'lives: ' + livescount;
let scorePoints = document.getElementById('score')
scorePoints.textContent = `Score: ${popped}`

function removeEvent(e) {
  e.target.removeEventListener('mouseover', function () {

  })
};

const score = () => {
  if (popped > 150) {
    console.log('all popped!');
    let details = document.querySelector('#dotContainer');
    let message = document.querySelector('#completeMessage');
    details.innerHTML = '';
    message.style.display = 'block';
    chance.textContent = ""
  }
};


const gameFunc = () => {
  let popGiven = document.getElementById('colorselect');
  let color = ['red', 'cyan', 'yellow', 'gray', 'green'];
  let randomColor = 0;
  

  randomColor = Math.floor(Math.random() * color.length)
  let interval = setInterval(() => {

    popGiven.textContent = `Please select  ${color[randomColor+1]}  color`;
    //console.log(color[randomColor])
    document.addEventListener('mouseover', function (e) {
      if (e.target.className === "balloon") {

        let idTarget = e.target;
       // console.log(idTarget.id)
        //onsole.log(color[randomColor] === idTarget.id)

        if (color[randomColor] === idTarget.id) {
          score()
          e.target.style.backgroundColor = "#ededed";
          e.target.style.backgroundColor = "#ededed";
          e.target.textContent = "POP!";
          popped = popped + 2
          scorePoints.textContent = `Score: ${popped}`
          removeEvent(e);

        }

        else {
          chance.textContent = 'lives: ' + --livescount
          if (livescount === 0) {

            let clearScreen = document.querySelector('#dotContainer');
            clearScreen.innerHTML = '';
            clearInterval(interval);
            popGiven.textContent = 'GAME OVER!'
          }

        };
      }
    }
    );

    randomColor++; //increament in Color randomly

    if (popped < 90 && randomColor == color.length) {
      randomColor = 0;
      setInterval(interval,800);
     

    }
    else if (popped >= 90) {

      let clearScreen = document.querySelector('#dotContainer');
      clearScreen.innerHTML = '';
      clearInterval(interval);
      popGiven.textContent = 'CONGRATS! You Played Well, ALL POPPED'
    }
    else if (randomColor == color.length && popped >= 44) {

      let clearScreen = document.querySelector('#dotContainer');
      clearScreen.innerHTML = '';
      clearInterval(interval);
      popGiven.textContent = 'CONGRATS! You Played Well, BUT NOT ALL POPPED'
    }
    else if (randomColor == color.length && popped < 40) {

      let clearScreen = document.querySelector('#dotContainer');
      clearScreen.innerHTML = '';
      clearInterval(interval);
      popGiven.textContent = 'Sorry!'
    }

  }, 6000)
}










