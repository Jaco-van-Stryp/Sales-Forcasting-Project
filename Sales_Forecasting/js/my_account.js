// Our web app's Firebase configuration
startLoading()
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
//Initialize Firestore
const db = firebase.firestore();

if (getCookie("self_authenticated") == "True") {} else {
    document.cookie = "prevPage=profile_page"
    document.location = "sign_in.html"
}


//Defining variables that needs to be loaded
var accountType, age, contactNumber, name, surname, email, freeMonths, gender, membership, monthsPaidMember, preferedTheme, qualifyFreeTrial, recoveryEmail, referalID, referedUser, regDate, removeAdverts, searchRemain, username;


var userData = null,
    userInformation = null;
firebase.auth().onAuthStateChanged(firebaseUser => {
    startLoading();

    if (firebaseUser) {
        userData = db.collection("users").doc(firebaseUser.uid);
        userData.get().then(function(doc) {
            if (doc.exists) {
                accountType = (doc.get("accountType"));
                age = (doc.get("age"));
                contactNumber = (doc.get("contactNumber"));
                email = (doc.get("email"));
                freeMonths = (doc.get("freeMonths"));
                gender = (doc.get("gender"));
                membership = (doc.get("membership"));
                monthsPaidMember = (doc.get("monthsPaidMember"));
                preferedTheme = (doc.get("preferedTheme"));
                qualifyFreeTrial = (doc.get("qualifyFreeTrial"));
                recoveryEmail = (doc.get("recoveryEmail"));
                referalID = (doc.get("referalID"));
                referedUser = (doc.get("referedUser"));
                regDate = (doc.get("regDate"));
                removeAdverts = (doc.get("removeAdverts"));
                searchRemain = (doc.get("searchRemain"));
                username = (doc.get("username"));
                name = (doc.get("name"));
                surname = (doc.get("surname"));
                searchHistory = (doc.get("searchHistory"));

                loadDataIntoPage()
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    } else {
        document.cookie = "self_authenticated=False"
        document.cookie = "prevPage=profile_page"
        document.location = ("sign_in.html");

    }
});


function arrayToString(array) {
    return array.toString().split(",").join("\n");
}

function loadDataIntoPage() {
    console.log(referalID)
    document.getElementById('replace_username').innerHTML = 'Welcome ' + membership + ' User - ' + name + ' ' + surname
    document.getElementById('user_email').value = email
    document.getElementById('user_username').value = username
    document.getElementById('acc_type_settings').innerHTML = accountType + " Account Settings"
    document.getElementById('user_name').value = name
    document.getElementById('user_surname').value = surname
    document.getElementById('user_age').value = age
    document.getElementById('user_contact_number').value = contactNumber
    document.getElementById('user_search_history').value = arrayToString(searchHistory)
    document.getElementById('user_registration_date').value = Date.parse(regDate)
    document.getElementById('user_referral_code').value = referalID
    document.getElementById('user_referedUser').value = referedUser
    document.getElementById('user_membership').value = membership
    if (removeAdverts == false) {
        document.getElementById('btn_adverts_active').style.backgroundColor = "green"
        document.getElementById('btn_adverts_active').style.borderColor = "green"
        document.getElementById('btn_adverts_active').innerHTML = "Active"

    } else {
        document.getElementById('btn_adverts_active').style.backgroundColor = "red"
        document.getElementById('btn_adverts_active').style.borderColor = "red"
        document.getElementById('btn_adverts_active').innerHTML = "Deactivated"

    }
    document.getElementById('searches_remain').innerHTML = searchRemain
    document.getElementById('tmpfm').innerHTML = monthsPaidMember

    if (qualifyFreeTrial == true) {
        document.getElementById('qft').style.backgroundColor = "green"
        document.getElementById('qft').style.borderColor = "green"
        document.getElementById('qft').innerHTML = "Yes"

    } else {
        document.getElementById('qft').style.backgroundColor = "red"
        document.getElementById('qft').style.borderColor = "red"
        document.getElementById('qft').innerHTML = "No"

    }
    document.getElementById('user_recovery_email').value = recoveryEmail


    stopLoading()
}
const passwordButton = document.getElementById("update_password_button");
passwordButton.addEventListener('click', e => {
    updatePassword(document.getElementById("user_password_first").value, document.getElementById("user_password_repeat").value)
});

function updatePassword(p1, p1c) {
    if (p1 == p1c && p1.length >= 8) {
        var user = firebase.auth().currentUser;
        var newPassword = p1;

        user.updatePassword(newPassword).then(function() {
            alert("Your password has successfully been updated!")
        }).catch(function(error) {
            alert("Something went wrong on our end!\nSorry about that! -" + error)

        });
    } else {
        alert("Please make sure your passwords match and are at least 8 characters long")
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