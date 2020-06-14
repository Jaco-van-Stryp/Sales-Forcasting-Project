//console.log("Auth - " + getCookie("self_authenticated"))

function loginError(message) {
    stopLoading();
    console.log(message)
    newUser = false;
    if (message.includes("badly formatted")) {
        document.getElementById('signin_main_lable').innerHTML = "Please Follow The Appropriate Email Format<br>email@example.com"

    }
    if (message.includes("There is no user record corresponding to this identifier. The user may have been deleted.")) {
        document.getElementById('signin_main_lable').innerHTML = "This Account is not allowed to login!"

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
        }

    });



    //Add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        firebaseUserData = firebaseUser;
        if (firebaseUser) {

            // console.log(firebaseUser);
            if (newUser == true) {

                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();

                today = mm + '/' + dd + '/' + yyyy;
                db.collection("users").doc(firebaseUser.uid).set({
                        email: userEmail.value, //Store User Email
                        username: "N/A", //TODO Store Username
                        membership: "default", //TODO create Membership
                        searchHistory: [], //TODO store search history
                        permissionCodes: [], //A list of codes that the user has permitions to, can be checked by aditional code to future proof
                        age: "N/A", //TODO capture Age
                        gender: "N/A", //TODO Capture Gender
                        preferedTheme: "dark", //TODO Capture Theme
                        regDate: today, //Stores Reg Date
                        accountType: "individual", //TODO Capture Accout Type
                        contactNumber: "N/A", //TODO Capture Phone Num
                        recoveryEmail: "N/A", //TODO Capture Recovery Email
                        qualifyFreeTrial: false, //TODO Free Trial
                        removeAdverts: false, //TODO Set Up Ad's
                        monthsPaidMember: 0, //TODO Total Months Paid
                        referalID: firebaseUser.uid, //Stores Referal ID
                        freeMonths: 0, //TODO Total Months of Membership Type Service Letf
                        referedUser: false, //TODO Was The User Refered
                        searchRemain: 10, //TODO Todal searches remaining before payment required
                        name: "N/A",
                        Surname: "N/A",
                        contactNumber: "N/A",
                        graphing: false,
                        history: false




                    }).then(function() {
                        // console.log("Document Account Successfully Created!");
                        redirect();

                    })
                    .catch(function(error) {
                        //  console.error("Error writing document: ", error);
                    });
            } else {
                redirect();
                document.cookie = "self_authenticated=True"

            }
        } else {
            document.cookie = "self_authenticated=False"

            //   console.log("not logged in");
        }
    });
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

function redirect() {
    startLoading();
    if (getCookie("forwading") == "a4e41cbdef004a7d9a98c83ceb13ffae") {
        document.cookie = "forwarding=no_value"

        window.location.replace("https://www.jaxifysoftware.com/employee/director.html");
    } else if (getCookie("prevPage") == "profile_page") {
        document.cookie = "prevPage=no_value"

        window.location.replace("https://www.jaxifysoftware.com/Sales_Forecasting/my_account.html");

    } else {
        document.cookie = "prevPage=no_value"

        window.location.replace("https://www.jaxifysoftware.com/Sales_Forecasting/");
    }
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