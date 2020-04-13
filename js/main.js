

updateExample(); //calling a function

var id = setInterval(updateExample, 5000); //this is an interval based variable which executes functions based on an interval

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
    if (searchValue != "") {
        window.open('http://google.com/search?q=' + searchValue); //opens a new URL
        searchAnimation();
    }
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

function updateData(input) {

}