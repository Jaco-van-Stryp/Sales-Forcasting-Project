const signInBtn = document.getElementById("index_into_men_signin");
console.log("Auth - " + getCookie("self_authenticated"))

if (getCookie("self_authenticated") == "True") {
    signInBtn.innerHTML = "Sign Out"
}


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



    signInBtn.addEventListener('click', e => {
        if (signedIn == true) {
            firebase.auth().signOut().then(function() {
                window.location.replace("https://www.jaxifysoftware.com/Sales_Forecasting/sign_in");
                console.log("Signed Out")
            }).catch(function(error) {
                alert.window.log("Could Not Sign You Out")
            });
        } else {
            window.location.replace("https://www.jaxifysoftware.com/Sales_Forecasting/sign_in");

        }


    });

    //Realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
            document.cookie = "self_authenticated=True"
            signInBtn.innerHTML = "Sign Out";
            signedIn = true;
        } else {
            document.cookie = "self_authenticated=False"
            console.log("not logged in");
            signInBtn.innerHTML = "Sign In"
            signedIn = false;
        }
    });
}());

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