//updateExample(); //calling a function

//Public Variables
//var id = setInterval(updateExample, 5000); //this is an interval based variable which executes functions based on an interval

//Functions are like voids, they execute a set of code and can be called using onclick="searchDatabase()"

//Function updates the example item based of a set of arrays using a random number generator
function updateExample() {
    var smartValue = ["Hand Sanitiser", "TV", "Tissue Box", "Paper", "Floor", "Glasses", "Newspaper", "Glow Stick", "Soy Sauce Packet", "Lamp Shade", "Bracelet", "Candy Wrapper", "Lip Gloss", "Smart Watch", "Soap", "Tooth picks", "Sun Glasses", "Photo Album", "Video Games", "Bag"]
    var num = Math.floor(Math.random() * 19) + 1
    document.getElementById('index_search_input').placeholder = "Eg. " + smartValue[num];
}

//Function will search through the existing database for data relating the users search query
function searchDatabase() {
    var searchValue = document.getElementById('index_search_input').value; //gets the VALUE of custom ID
    //   document.getElementById('index_search_input').value = ""; //Sets the value

    /*
    if (searchValue != "") {
        window.open('http://google.com/search?q=' + searchValue); //opens a new URL
        searchAnimation();
    }
    */
    storeSearchQuery(searchValue)
}

//Function plays an animation while searching
function searchAnimation() {
    document.getElementById("index_search_input").style.pointerEvents = "none";
    setTimeout(() => {
        document.getElementById("index_search_input").style.pointerEvents = "all";
        document.getElementById("index_search_input").value = "";
    }, 5000)
    document.getElementById("index_search_input").value = "Please Wait, Searching..."


}
//Function to store the search query
function storeSearchQuery(query) {
    var mainData = "searchQuery=" + query
    document.cookie = mainData;
}

//Function to retrieve the name for the query
function writeSearchName() {
    console.log(document.cookie)
    var info = document.getElementById('results_query').value
    console.log(info)
}

function SignIn() {
    window.alert("working");
}

function loginError(message) {
    window.alert(message)
}
(function() {
    var signedIn = false;
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

    const signInBtn = document.getElementById("index_into_men_signin");

    signInBtn.addEventListener('click', e => {
        if (signedIn == true) {
            firebase.auth().signOut().then(function() {
                window.location.replace("https://www.jaxifysoftware.com/Sales_Forecasting/sign_in"); =
            }).catch(function(error) {
                alert.window.log("Could Not Sign You Out")
            });
        } else {
            window.location.replace("https://www.jaxifysoftware.com/Sales_Forecasting/sign_in");

        }
        const auth = firebase.auth();
        //Sign In
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => loginError(e.message));
    });

    //Realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
            signInBtn.innerHTML = "Sign Out";
            signedIn = true;
        } else {
            console.log("not logged in");
            signedIn = false;
        }
    });
}());