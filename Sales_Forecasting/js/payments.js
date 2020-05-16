//FireBase Database 

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
if (getCookie("self_authenticated") == "True") {

} else {
    document.cookie = "prevPage=Payment"
    window.location.replace("https://www.jaxifysoftware.com/Sales_Forecasting/sign_in");
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
//Initialize Firestore
const db = firebase.firestore();

//////////////////////////////////////////////////////////

//Pricing
var basicPlan = 5;
var premiumPlan = 15;
var fullAccessPlan = 25;

var user = firebase.auth().currentUser;
if (user) {} else {
    document.cookie = "prevPage=Payment"
    window.location.replace("https://www.jaxifysoftware.com/Sales_Forecasting/sign_in");

}
var userData = db.collection("users").doc(user.uid);

// Atomically add a new region to the "regions" array field.
function grantPermitions(level) {
    var perms = ""

    if (level == "basic") {
        perms = "basic";
    } else if (level == "premium") {
        perms = "premium";
    } else if (level == "full") {
        perms = "fullAccess";
    } else {
        perms = "unkown_perm"
    }
    userData.update({
        permissionCodes: firebase.firestore.FieldValue.arrayUnion(perms)
    });
    userData.update({
            membership: perms,
            removeAdverts: true,
            searchRemain: 100
        }).then(function() {
            console.log("Document successfully updated!");
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });


}


//BASIC PLAN
paypal.Buttons({
    createOrder: function(data, actions) {
        // This function sets up the details of the transaction, including the amount and line item details.
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: basicPlan
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        // This function captures the funds from the transaction.
        return actions.order.capture().then(function(details) {

            window.location.replace("https://www.jaxifysoftware.com/Sales_Forecasting");
        });
    }
}).render('#paypal-basic-button');

//PREMIUM PLAN
paypal.Buttons({
    createOrder: function(data, actions) {
        // This function sets up the details of the transaction, including the amount and line item details.
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: premiumPlan
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        // This function captures the funds from the transaction.
        return actions.order.capture().then(function(details) {

            //alert('You Purchased The Premium Plan ' + details.payer.name.given_name);
            window.location.replace("https://www.jaxifysoftware.com/Sales_Forecasting");

        });
    }
}).render('#paypal-premium-button');

//FULL ACCESS PLAN
paypal.Buttons({
    createOrder: function(data, actions) {
        // This function sets up the details of the transaction, including the amount and line item details.
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: fullAccessPlan
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        // This function captures the funds from the transaction.
        return actions.order.capture().then(function(details) {

            //alert('You Purchased The Full Access Plan ' + details.payer.name.given_name);
            window.location.replace("https://www.jaxifysoftware.com/Sales_Forecasting");

        });
    }
}).render('#paypal-fullAccess-button');





//Firebase Permition Authentican Code!
function FirebaseGivePerm(permCode) {

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