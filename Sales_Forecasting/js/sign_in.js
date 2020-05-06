function loginError(message) {
    window.alert(message)
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

        const auth = firebase.auth();
        //Sign In
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => loginError(e.message));

    });
    register.addEventListener('click', e => {
        const email = userEmail.value;
        const pass = userPassword.value;
        //TODO: Make sure the email is validated
        const auth = firebase.auth();
        //Sign In
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => loginError(e.message));
    });

    //Add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
            window.location.replace("https://www.jaxifysoftware.com/Sales_Forecasting/");
        } else {
            console.log("not logged in");
        }
    });
}());