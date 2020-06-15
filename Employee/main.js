//console.log("Auth - " + getCookie("self_authenticated"))

function loginError(message) {
    stopLoading();
    console.log(message)
    newUser = false;
    if (message.includes("badly formatted")) {
        document.getElementById('signin_main_lable').innerHTML = "Please Follow The Appropriate Email Format<br>email@example.com"

    }
    if (message.includes("There is no user record corresponding to this identifier. The user may have been deleted.")) {
        document.getElementById('signin_main_lable').innerHTML = "Sorry, You are not an employee of Jaxify Software!"

    }
    if (message.includes("The password is invalid")) {
        document.getElementById('signin_main_lable').innerHTML = "Please Make Sure You Entered The Correct Email & Employee Code!"

    }
    if (message.includes("already in use")) {
        document.getElementById('signin_main_lable').innerHTML = "This Email Already Exists, Try Signing In!"

    }


}
(function() {
    // Our web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyA9979-Um1TwPLskZr72_2bfiEJDpt2jSM",
        authDomain: "jaxify-software-administration.firebaseapp.com",
        databaseURL: "https://jaxify-software-administration.firebaseio.com",
        projectId: "jaxify-software-administration",
        storageBucket: "jaxify-software-administration.appspot.com",
        messagingSenderId: "202323429712",
        appId: "1:202323429712:web:b0ac3661a5b8a00a330455",
        measurementId: "G-HDPSLJ18QK"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    //Initialize Firestore
    const db = firebase.firestore();

    var newUser = false;
    const userEmail = document.getElementById("client_info");
    const userPassword = document.getElementById("password_info");
    const btnLogin = document.getElementById('signin_btn');

    btnLogin.addEventListener('click', e => {
        startLoading();

        const email = userEmail.value;
        const pass = userPassword.value;
        if (accountValidation(email, pass) == true) {

            const auth = firebase.auth();
            //Sign In
            const promise = auth.signInWithEmailAndPassword(email, pass);
            promise.catch(e => loginError(e.message));

            var auth_role = "";

            firebase.auth().onAuthStateChanged(firebaseUser => {
                startLoading();

                if (firebaseUser) {
                    userData = db.collection("employees").doc(firebaseUser.email);
                    console.log(firebaseUser.email)
                    userData.get().then(function(doc) {
                        if (doc.exists) {
                            auth_role = (doc.get("emp_job"));
                            if (auth_role == "Director") {
                                document.location = 'management.html';
                            } else if (auth_role == "Developer") {
                                document.location = 'development.html';


                            } else if (auth_role == "Reference") {
                                document.location = 'reference.html';


                            } else if (auth_role == "Project Manager") {
                                document.location = 'projectmanager.html';


                            }
                        } else {
                            // doc.data() will be undefined in this case
                            stopLoading();
                            console.error("Fail")
                        }
                    }).catch(function(error) {
                        console.log("Error getting document:", error);
                    });
                } else {
                    stopLoading();
                }
            });
        }
    })
}());

function accountValidation(email, pass) {

    if (email.includes("@") && email.includes(".") && email.length > 11) {
        if (pass.length > 8) {
            return true;
        } else {
            stopLoading();

            document.getElementById('signin_main_lable').innerHTML = "Please Make Sure Your Employee Code Is At least 8 Characters Long"
        }
    } else {
        stopLoading();

        document.getElementById('signin_main_lable').innerHTML = "Please Follow The Appropriate Email Format<br>email@example.com"
    }
    return false;
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}



stopLoading();

function startLoading() {
    document.getElementById('loader').style.display = "block";
    document.getElementById('loading').style.display = "block";
    document.getElementById('overlay').style.display = "block";
}

function stopLoading() {
    document.getElementById('loader').style.display = "none";
    document.getElementById('loading').style.display = "none";
    document.getElementById('overlay').style.display = "none";
}