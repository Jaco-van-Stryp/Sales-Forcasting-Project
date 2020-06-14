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

    firebase.auth().onAuthStateChanged(firebaseUser => {
        startLoading();

        if (firebaseUser) {
            userData = db.collection("employees").doc(firebaseUser.email);
            userData.get().then(function(doc) {
                if (doc.exists) {
                    auth_role = (doc.get("emp_job"));
                    if (auth_role != "Director") {
                        window.location.replace("https://employee.jaxifysoftware.com");
                    } else {
                        stopLoading();
                    }
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                    window.location.replace("https://employee.jaxifysoftware.com");

                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
                window.location.replace("https://employee.jaxifysoftware.com");

            });
        } else {

            window.location.replace("https://employee.jaxifysoftware.com");
            stopLoading();
        }
    });


    var newUser = false;
    const hireEmp = document.getElementById("btn_hire_new_emp");


    //Creating new employee
    hireEmp.addEventListener('click', e => {
        startLoading();
        const email = document.getElementById("emp_email").value;
        const password = document.getElementById('emp_password').value;
        const employee_ID = document.getElementById('emp_id').value;
        const name = document.getElementById('emp_name').value;
        const surname = document.getElementById('emp_surname').value;
        const earn_start = document.getElementById('earn_start').value;
        const earn_stop = document.getElementById('earn_stop').value;
        console.log(email)
        var emp_role = "Developer" //Todo Add button Switches
        var fine = true;
        var auth_role = "";

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        db.collection("employees").doc(email).set({
                id: employee_ID,
                email: email,
                name: name,
                surname: surname,
                emp_job: emp_role,
                salary_pers_min: earn_start,
                salary_pers_max: earn_stop,
                active_projects: 0,
                completed_projects: 0,
                cur_prj_id: "N/A",
                status: "Hired",
                date_hired: today,

            }).then(function() {

                firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    alert(errorMessage)

                });

                firebase.auth().signOut().then(function() {
                    // window.location.replace("https://employee.jaxifysoftware.com");
                }).catch(function(error) {});
            })
            .catch(function(error) {

            });

        stopLoading();


    });
}());



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