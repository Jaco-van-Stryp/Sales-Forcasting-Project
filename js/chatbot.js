var id = setInterval(chatUpdate, 1);


//function result
var reset = false;
var result = "";
function chatUpdate() {
    //Recieve Content and eliminate existing info
    var cb_value = document.getElementById('chatbot').value
    cb_value = cb_value.replace("I Need Help With:", "")
    cb_value = cb_value.toLowerCase()

    if (cb_value.includes("mail")) {
        result = "You can email us by pressing the button below or directly contact us via jaxifybusiness@gmail.com"
    } else if (cb_value.includes("use")) {
        result = "Enter some text in the search bar at the home page and click search to see your results"
    }
    else if (cb_value.includes("account")) {
        result = "Accounts do not exist yet"
    }
    else if (cb_value == "") {
        result = "Welcome To The Sales Forcasting Help Section!\nI'm Here To Assist You!"

    } else if (reset == true) {
        result = "I do not know how to respond to this question, you can email us at jaxifybusiness@gmail.com"
    }
    else {
        result = "Welcome To The Sales Forcasting Help Section!\nI'm Here To Assist You!";
    }

    document.getElementById('chatbot_responce').value = result

}
function chatActive() {
    reset = true;
}