// Our web app's Firebase configuration
startLoading()
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
/*
if (getCookie("self_authenticated") == "True") {} else {
    document.cookie = "prevPage=profile_page"
    window.location = "/sign_in");
}

*/
//Defining variables that needs to be loaded
var curprojID, name, salary_max, salary_min, smartStatus
var clientInvoiced, clientName, due, managerContact, instructions, type, currentStatus, lastUpdatedBy;


var userData = null,
    userInformation = null;
firebase.auth().onAuthStateChanged(firebaseUser => {
    startLoading();

    if (firebaseUser) {
        userData = db.collection("employees").doc(firebaseUser.email);
        userData.get().then(function(doc) {
            if (doc.exists) {
                role = (doc.get('emp_role'))
                if (role != "Developer" || role != "Director") {

                }
                curprojID = (doc.get('cur_prj_id'));
                name = (doc.get('name'));
                salary_max = (doc.get('salary_pers_max'));
                salary_min = (doc.get('salary_pers_min'));
                smartStatus = (doc.get('status'));

                userData = db.collection("projects").doc(curprojID);
                userData.get().then(function(doc) {
                    if (doc.exists) {

                        clientInvoiced = (doc.get("ClientInvoiced"));
                        clientName = (doc.get("ClientName"));
                        due = (doc.get("DueDate"));
                        managerContact = (doc.get("ManagerEmail"));
                        instructions = (doc.get("ProjectInstructions"));
                        type = (doc.get("ProjectType"));
                        instructions = (doc.get("ProjectInstructions"));
                        currentStatus = (doc.get("Status"));
                        lastUpdatedBy = (doc.get("lastUpdatedBy"));


                        //Load Data Into Page


                        // One day Time in ms (milliseconds) 
                        var one_day = 1000 * 60 * 60 * 24

                        // To set present_dates to two variables 
                        var today = new Date();
                        var present_date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
                        var finalDate = Date.parse(due);
                        var Result = Math.round(finalDate - present_date) / (one_day);
                        var Final_Result = Result.toFixed(0);

                        salary_max = parseFloat(salary_max);
                        salary_min = parseFloat(salary_min);
                        var inbetween = salary_max - salary_min;
                        inbetween = inbetween / 2;
                        salary_min + inbetween;
                        devPaycheck = salary_min / 100 * clientInvoiced;

                        document.getElementById('user_display_name').innerHTML = 'Good Day ' + name;
                        document.getElementById('dev_backlog_status').innerHTML = 'You Currently Have 1 Project Strictly Due On ' + due;
                        document.getElementById('dev_compensation').innerHTML = "You Shall be Compensated R" + devPaycheck + " Exactly 1 Month After You Completed The Project, Should You Accept This Project.";
                        document.getElementById('dev_instructions_before').innerHTML = "Project Instructions are as follows:<br\><br\>";
                        document.getElementById('dev_instructions').innerHTML = "Project Type: " + type + "\n\n" + instructions + "\n\nThe manager that you should be in contact with throughout this project has the contact email of " + managerContact + "\n\n By Clicking the Accept button below, You agree to the Terms And Conditions You Signed";
                        document.getElementById('dev_instructions').style.display = "inline";
                        if (currentStatus == "Project Registered") {
                            document.getElementById('quickVis01').style.display = "inline";
                            document.getElementById('quickVis02').style.display = "inline";
                        }




                        stopLoading();
                    } else {
                        document.getElementById('user_display_name').innerHTML = 'Good Day ' + name;
                        document.getElementById('dev_backlog_status').innerHTML = 'You Currently Have No Projects Assigned To Your Name.<br/><br/>Please Speak To A Manager If You Believe This Is A Mistake!';
                        stopLoading();

                    }
                }).catch(function(error) {
                    document.getElementById('user_display_name').innerHTML = 'Good Day ' + name;
                    document.getElementById('dev_backlog_status').innerHTML = 'You Currently Have No Projects Assigned To Your Name.<br/><br/>Please Speak To A Manager If You Believe This Is A Mistake!';
                    stopLoading();

                });
            } else {
                //    alert("Redirecting ERR - " + "Not Authenticated")
                document.location = "index.html"
            }
            stopLoading();

        }).catch(function(error) {
            document.getElementById('user_display_name').innerHTML = 'Good Day ' + name;
            document.getElementById('dev_backlog_status').innerHTML = 'You Currently Have No Projects Assigned To Your Name.<br/><br/>Please Speak To A Manager If You Believe This Is A Mistake!';
            stopLoading();

        });
    } else {
        //    alert("Redirecting ERR - Not logged in")
        document.cookie = "self_authenticated=False"
        document.cookie = "prevPage=profile_page"
        document.location = "index.html"
    }


    //Loading Data
});


function arrayToString(array) {
    return array.toString().split(",").join("\n");
}

function loadDataIntoPage() {


}
const signoutbtn = document.getElementById("sign_out_user");
signoutbtn.addEventListener('click', e => {
    firebase.auth().signOut().then(function() {
        window.location = 'index.html';
        // console.log("Signed Out")
    }).catch(function(error) {
        // alert.window.log("Could Not Sign You Out")
    });
});



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