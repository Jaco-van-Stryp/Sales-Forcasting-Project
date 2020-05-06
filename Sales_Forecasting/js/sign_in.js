function loginError(message) {
    console.log(message)

    if (message.includes("badly formatted")) {
        document.getElementById('signin_main_lable').innerHTML = "Good Day!<br><br>Please Follow The Appropriate Email Format<br>email@example.com"

    }
    if (message.includes("There is no user record corresponding to this identifier. The user may have been deleted.")) {
        document.getElementById('signin_main_lable').innerHTML = "Good Day!<br><br>Your Account Does Not Exist Yet, Feel Free To Click The Register Button To Join Our Website!"

    }
    if (message.includes("The password is invalid")) {
        document.getElementById('signin_main_lable').innerHTML = "Good Day!<br><br>Please Make Sure You Entered The Correct Email & Password!"

    }
}
(function() {
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyA3G8meYatHgI-5KXPFkZYkACV7ULwkV30",
        authDomain: "sales-forecasting-prj251.firebaseapp.com",
        databaseURL: "https://sales-forecasting-prj251.firebaseio.com",
        projectId: "sales-forecasting-prj251",
        storageBucket: "sales-forecasting-prj251.appspot.com",
        messagingSenderId: "872303846348",
        appId: "1:872303846348:web:fcc611f0f93d75abcbf369",
        measurementId: "G-KS26CVC8Y2",
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    const userEmail = document.getElementById("client_info");
    const userPassword = document.getElementById("password_info");
    const btnLogin = document.getElementById('signin_btn');
    const register = document.getElementById('reg_btn');

    btnLogin.addEventListener('click', e => {

        const email = userEmail.value;
        const pass = userPassword.value;
        if (accountValidation(email, pass) == true) {

            const auth = firebase.auth();
            //Sign In
            const promise = auth.signInWithEmailAndPassword(email, pass);
            promise.catch(e => loginError(e.message));
        }


    });

    var actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be whitelisted in the Firebase Console.
        url: 'https://www.jaxifysoftware.com/Sales_Forecasting/index.html',
        // This must be true.
        handleCodeInApp: true,
        iOS: {
            bundleId: 'com.example.ios'
        },
        android: {
            packageName: 'com.example.android',
            installApp: true,
            minimumVersion: '12'
        },
        dynamicLinkDomain: 'example.page.link'
    };

    register.addEventListener('click', e => {
        const email = userEmail.value;
        const pass = userPassword.value;

        if (accountValidation(email, pass) == true) {
            const auth = firebase.auth();
            //Sign In
            const promise = auth.createUserWithEmailAndPassword(email, pass);
            promise.catch(e => loginError(e.message));

            auth.sendSignInLinkToEmail(email, actionCodeSettings)
                .then(function() {
                    // The link was successfully sent. Inform the user.
                    // Save the email locally so you don't need to ask the user for it again
                    // if they open the link on the same device.
                    window.alert("Email Sent")
                    window.localStorage.setItem('emailForSignIn', email);
                })
                .catch(function(error) {
                    window.alert("Email NOT Sent - " + error)
                        // Some error occurred, you can inspect the code: error.code
                });
        }
    });

    //Add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
            window.location.replace("https://www.jaxifysoftware.com/Sales_Forecasting");
        } else {
            console.log("not logged in");
        }
    });
}());

function accountValidation(email, pass) {
    if (email.includes("@") && email.includes(".") && email.length > 11) {
        if (pass.length > 8) {
            return true;
        } else {
            document.getElementById('signin_main_lable').innerHTML = "Good Day!<br><br>Please Make Sure Your Password Is Atleast 8 Characters Long"
        }
    } else {
        document.getElementById('signin_main_lable').innerHTML = "Good Day!<br><br>Please Follow The Appropriate Email Format<br>email@example.com"
    }
    return false;
}