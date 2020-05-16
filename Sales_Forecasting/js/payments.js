//FireBase Database 
console.log("Auth - " + getCookie("self_authenticated"))
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
if (getCookie("self_authenticated") == "True") {} else {
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
var userDetails = null;




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

            grantPermitions("basic")
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
                    value: premiumPlan,
                    currency_code: "USD"
                },
                reference_Id: "PURMEMPREM",
                description: 'Sales Forecasting - Premium Membership',
                custom_id: 'Premium001',
                soft_descriptor: "Premium Membership"
            }]
        });
    },
    onApprove: function(data, actions) {
        // This function captures the funds from the transaction.
        return actions.order.capture().then(function(details) {
            grantPermitions("premium")
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
            grantPermitions("fullAccess")
        });
    }
}).render('#paypal-fullAccess-button');


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
var userData = null;

firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        userData = db.collection("users").doc(firebaseUser.uid);

    } else {
        document.cookie = "self_authenticated=False"
        document.cookie = "prevPage=Payment"
        window.location.replace("https://www.jaxifysoftware.com/Sales_Forecasting/sign_in");

    }
});

function grantPermitions(level) {
    var perms = ""
    var searches = 0;
    if (level == "basic") {

        membershipLevel = 1
        perms = "basic";
        searches = 30;

    } else if (level == "premium") {

        membershipLevel = 2

        perms = "premium";
        searches = 100;


    } else if (level == "fullAcess") {

        membershipLevel = 3

        perms = "fullAccess";
        searches = 9999999;


    } else {
        perms = "unkown_perm"
    }

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            userData = db.collection("users").doc(firebaseUser.uid);
            userData.update({
                    membership: level + "",
                    permissionCodes: firebase.firestore.FieldValue.arrayUnion(perms),
                    removeAdverts: true,
                    searchRemain: 100,
                    monthPurchased: Date.now(),
                    membershipLevel: membershipLevel
                }).then(function() {
                    paymentRedirect();
                })
                .catch(function(error) {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);

                });
        } else {
            document.cookie = "self_authenticated=False"
            document.cookie = "prevPage=Payment"
            window.location.replace("https://www.jaxifysoftware.com/Sales_Forecasting/sign_in");

        }
    });

}



function paymentRedirect() {
    //TODO: Update this section to more advanced system
    window.location.replace("https://www.jaxifysoftware.com/Sales_Forecasting");
}