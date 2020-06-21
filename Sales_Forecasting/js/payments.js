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
if (getCookie("self_authenticated") == "True") {} else {
    document.cookie = "prevPage=Payment"
    document.location = "sign_in.html"

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
        fillBackground(1);
        // This function sets up the details of the transaction, including the amount and line item details.
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: basicPlan
                },
                reference_Id: "PURMEMBASIC",
                description: 'Sales Forecasting - Basic Membership',
                custom_id: 'Basic001',
                soft_descriptor: "Basic Membership"
            }]
        });
    },
    onApprove: function(data, actions) {
        // This function captures the funds from the transaction.
        return actions.order.capture().then(function(details) {

            grantPermitions("basic")
        });
    },
    onCancel: function(data) {
        stopLoading();
        deFillBackground();

    },
    onAuthorize: function(data, actions) {
        startLoading();
        deFillBackground();

    },
}).render('#paypal-basic-button');

//PREMIUM PLAN
paypal.Buttons({

    createOrder: function(data, actions) {
        fillBackground(2);
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
    },
    onCancel: function(data) {
        stopLoading();
        deFillBackground();


    },
    onAuthorize: function(data, actions) {
        startLoading();
        deFillBackground();

    },
}).render('#paypal-premium-button');

//FULL ACCESS PLAN
paypal.Buttons({
    createOrder: function(data, actions) {
        fillBackground(3);
        // This function sets up the details of the transaction, including the amount and line item details.
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: fullAccessPlan
                },
                reference_Id: "PURMEMFULL",
                description: 'Sales Forecasting - Full Access Membership',
                custom_id: 'FullAccess001',
                soft_descriptor: "Full Access Membership",
                experience: {
                    input_fields: {
                        no_shipping: 1
                    }
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        // This function captures the funds from the transaction.
        return actions.order.capture().then(function(details) {
            grantPermitions("fullAccess")
        });
    },
    onCancel: function(data) {
        stopLoading();
        deFillBackground();


    },
    onAuthorize: function(data, actions) {
        startLoading();
        deFillBackground();
    },
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
        document.location = "sign_in.html"


    }
});

function grantPermitions(level) {
    var perms = ""
    var searches = 0;
    membershipLevel = 0;
    if (level == "basic") {

        membershipLevel = 1
        perms = "basic";
        searches = 30;

    } else if (level == "premium") {

        membershipLevel = 2

        perms = "premium";
        searches = 100;


    } else if (level == "fullAccess") {

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
                    datePurchased: Date.now(),
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
            document.location = "sign_in.html"


        }
    });

}



function paymentRedirect() {
    startLoading()
    deFillBackground()

    //TODO: Update this section to more advanced system
    document.location = "index.html"

}

stopLoading();
(function() {
    document.getElementsByClassName('paypal-button-number-0').addEventListener('click', e => { startLoading() });

})

function startLoading() {
    document.getElementById('loader').style.display = "block";
    document.getElementById('loading').style.display = "block";
    document.getElementById('overlay').style.display = "block";
}

function stopLoading() {
    document.getElementById('loader').style.display = "none";
    document.getElementById('loading').style.display = "none";
    document.getElementById('overlay').style.display = "none";
    deFillBackground()
}

function fillBackground(numValue) {
    var style = document.createElement('style');
    document.head.appendChild(style);
    style.sheet.insertRule('#autobackfill' + numValue + ' {color: white; background-color: rgba(0, 0, 0, 5);');



}

function deFillBackground() {
    var style = document.createElement('style');
    document.head.appendChild(style);
    style.sheet.insertRule('#autobackfill1, #autobackfill2, #autobackfill3 {color: white; background-color: rgba(0, 0, 0, 0);');


}