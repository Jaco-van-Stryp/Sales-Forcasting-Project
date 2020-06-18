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
    var fbuser = "";
    firebase.auth().onAuthStateChanged(firebaseUser => {
        startLoading();

        if (firebaseUser) {
            userData = db.collection("employees").doc(firebaseUser.email);
            userData.get().then(function(doc) {
                if (doc.exists) {
                    auth_role = (doc.get("emp_job"));
                    if (auth_role != "Director") {
                        document.location = 'index.html';

                    } else {
                        stopLoading();
                        fbuser = firebaseUser.email;

                    }
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                    document.location = 'index.html';


                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
                document.location = 'index.html';


            });
        } else {

            document.location = 'index.html';
            stopLoading();
        }
    });


    var newUser = false;
    const hireEmp = document.getElementById("btn_hire_new_emp");
    const regProject = document.getElementById("final_add_project");
    const genRandom = document.getElementById("auto_generate");
    genRandom.addEventListener('click', e => {

        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        uuid = uuid.substr(0, 8);
        document.getElementById("project_ID").value = uuid;

    });

    regProject.addEventListener('click', e => {
        startLoading();
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        var projID = "blank"
        projID = document.getElementById("project_ID").value
        var developer = document.getElementById("project_developer_email").value
        var manager = document.getElementById("project_manager_email").value
        var projectType = "Website"
        var reference = document.getElementById("project_reference_email").value
        var clientName = document.getElementById("project_client_name").value
        var clientEmail = document.getElementById("project_client_email").value
        var clientInvoiced = document.getElementById("project_client_invoiced").value
        var projectStatus = "Project Registered"
        var instructions = document.getElementById("project_instructions").value
        var dueDate = document.getElementById("project_due_date").value
        today = mm + '/' + dd + '/' + yyyy;

        if (projID == "" || projID.length <= 7 || developer == "" || manager == "" || reference == "" || clientName == "" || clientEmail == "" || clientInvoiced == "" || projectStatus == "" || instructions == "" || dueDate == "") {
            alert("Please make sure all info is filled in correctly")
        } else {

            startLoading()
            db.collection("projects").doc(projID + "").set({
                    ProjectID: projID,
                    ProjectType: projectType,
                    DeveloperEmail: developer,
                    ManagerEmail: manager,
                    ReferenceEmail: reference,
                    ClientName: clientName,
                    ClientInvoiced: clientInvoiced,
                    Status: projectStatus,
                    ProjectInstructions: instructions,
                    DueDate: dueDate,
                    lastUpdatedBy: fbuser
                }).then(function() {
                    db.collection("employees").doc(developer).update({
                            cur_prj_id: projID

                        }).then(function() {
                            ///
                            db.collection("employees").doc(reference).update({ //TODO Change to update when creating references
                                    cur_prj_id: projID //TODO Figure this out
                                }).then(function() {
                                    stopLoading();
                                    alert("Project ID " + projID + " Has successfully been created / Updated for " + clientName + "\n\nThey can refer to their project details via client.jaxifysoftware.com")

                                })
                                .catch(function(error) {
                                    stopLoading();
                                    alert(error)
                                });
                            ///
                            stopLoading();
                        })
                        .catch(function(error) {
                            stopLoading();
                            alert(error)
                        });
                })
                .catch(function(error) {
                    stopLoading();
                    alert(error)
                });



        }
        stopLoading();

    })
    const developerMode = document.getElementById("dev_mode");
    developerMode.addEventListener('click', e => {
            document.location = "development.html"
        })
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
                hired_by: fbuser,

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

const signoutbtn = document.getElementById("sign_out_user");
signoutbtn.addEventListener('click', e => {
    firebase.auth().signOut().then(function() {
        window.location = 'index.html';
        // console.log("Signed Out")
    }).catch(function(error) {
        alert.window.log("Could Not Sign You Out")
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