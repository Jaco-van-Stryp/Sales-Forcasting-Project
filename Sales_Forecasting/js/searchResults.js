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
//Initialize Firestore
const db = firebase.firestore();

window.onload = function() {
    console.log("Loaded")
    setSearchQuery()
}

function setSearchQuery() {
    var info = getCookie("searchQuery")
    console.log(info)

    document.getElementById("results_query").innerHTML = "Showing Sales Forecasting Results For " + info

}
//This function takes cookies and decodes them to get the name
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
            return (c.substring(name.length, c.length)).toLowerCase();
        }
    }
    return "";
}

//TODO - Get Cookie and search firebase for an existing project
//TODO - Write code to generate a table


function calculate(Main4Values) {
    let jan = Main4Values.January;
    let feb = Main4Values.Febuary;
    let mar = Main4Values.March;
    let apr = (jan + feb + mar) / 3;
    let may = (feb + mar + apr) / 3;
    let jun = (mar + apr + may) / 3;
    let jul = (apr + may + jun) / 3;
    let aug = (may + jun + jul) / 3;
    let sep = (jun + jul + aug) / 3;
    let oct = (jul + aug + sep) / 3;
    let nov = (aug + sep + oct) / 3;
    let dec = (sep + oct + nov) / 3;

    let Predict = {
        Company: Main4Values.Company,
        Year: Main4Values.Year,
        January: Math.round(jan),
        Febuary: Math.round(feb),
        March: Math.round(mar),
        April: Math.round(apr),
        May: Math.round(may),
        June: Math.round(jun),
        July: Math.round(jul),
        August: Math.round(aug),
        September: Math.round(sep),
        October: Math.round(oct),
        November: Math.round(nov),
        December: Math.round(dec),
        Total: Math.round(jan + feb + mar + apr + may + jun + jul + aug + sep + oct + nov + dec),
    }
    return Predict;
}

function populatePredictions() {

}
let Predictions = [];
var curDocumentData = db.collection("predefined-searches").doc(getCookie());

curDocumentData.get().then(function(doc) {
    if (doc.exists) {
        Predictions = doc.data();
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
});
loadTable(Predictions)

function loadTable(streamData) {
    db.collection("predefined-searches").doc(getCookie()).set({ streamData })
    let PredictionMonths = [];
    for (var x = 0; x < streamData.length; x++) {
        PredictionMonths.push(calculate(streamData[x]))
    }
    console.log(PredictionMonths)
    let table = document.getElementById("mainTable");
    table.innerHTML = "<tr><th> Company </th><th> Year </th> <th> January </th> <th> February </th> <th> March </th> <th> April </th> <th> May </th> <th> June </th> <th> July </th> <th> August </th> <th> September </th> <th> October </th> <th> November </th> <th> December </th><th> Total Predicted Sales </th></tr>";
    for (var i = 0; i < PredictionMonths.length; i++) {
        table.innerHTML += "<tr><th>" + PredictionMonths[i].Company + "</th><th>" + PredictionMonths[i].Year + "</th><th>" + PredictionMonths[i].January + "</th><th>" + PredictionMonths[i].Febuary + "</th><th>" + PredictionMonths[i].March + "</th><th>" + PredictionMonths[i].April + "</th><th>" + PredictionMonths[i].May + "</th><th>" + PredictionMonths[i].June + "</th><th>" + PredictionMonths[i].July + "</th><th>" + PredictionMonths[i].August + "</th><th>" + PredictionMonths[i].September + "</th><th>" + PredictionMonths[i].October + "</th><th>" + PredictionMonths[i].November + "</th><th>" + PredictionMonths[i].September + "</th><th>" + PredictionMonths[i].Total + "</th></tr>";
    }

}

function addYear() {
    let company = prompt("Which Company Are You Forecasting");
    let year = Number(prompt("Please enter the year for this forecast"));
    let jan = Number(prompt("Please enter January's Value"));
    let feb = Number(prompt("Please enter February's Value"));
    let mar = Number(prompt("Please enter March's Value"));

    Predictions.push({
        Company: company,
        Year: year,
        January: jan,
        Febuary: feb,
        March: mar
    })
    loadTable(Predictions)

}