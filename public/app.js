// Initialize Firebase
var config = {
    apiKey: "AIzaSyBWuU8SI_WlqW66jYZS_rcr8QQwjOK8Vz8",
    authDomain: "craftango.firebaseapp.com",
    databaseURL: "https://craftango.firebaseio.com",
    storageBucket: "craftango.appspot.com",
};
firebase.initializeApp(config);

/**
 * Handles the sign in button press.
 */
function toggleSignIn() {
    if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
    } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (password.length < 4) {
            alert('Please enter a password.');
            return;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                console.error(error);
            }
            // [END_EXCLUDE]
        });
        // [END authwithemail]
    }
//    document.getElementById('quickstart-sign-in').disabled = true;
}

function handleSignUp() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (email.length < 4) {
        alert('Please enter an email address.');
        return;
    }
    if (password.length < 4) {
        alert('Please enter a password.');
        return;
    }
    // Sign in with email and pass.
    // [START createwithemail]
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            console.error(error);
        }
        // [END_EXCLUDE]
    });
    // [END createwithemail]
}


    function verify(){
        console.log("Verify Email");
        firebase.auth().currentUser.sendEmailVerification();
        
    }


function initApp() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            
            console.log(user);
//            
        } else {
            console.log("signed out");
        }
        // [START_EXCLUDE silent]
//        document.getElementById('quickstart-sign-in').disabled = false;
        // [END_EXCLUDE]
    });
    // [END authstatelistener]

    document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
    document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
    document.getElementById('verify').addEventListener('click',verify,false);
}

window.onload = function () {
    initApp();
};