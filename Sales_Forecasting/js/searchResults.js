startLoading()
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



function calculate(Main4Values) { //Mathimatical Predictions
    let jan = Main4Values.January; //10
    let feb = Main4Values.Febuary; //12
    let mar = Main4Values.March; // 50
    let apr = (jan + feb + mar) / 3;
    let may = 0
    if (apr > mar) {
        may = ((feb + mar + apr) / 3) * 1.1;
    } else {
        may = ((feb + mar + apr) / 3) * 0.9;
    }
    let jun = 0;
    if (may > apr) {
        jun = ((mar + apr + may) / 3) * 1.1;
    } else {
        jun = (mar + apr + may) / 3 * 0.9;
    }
    let jul = 0;
    if (jun > may) {
        jul = (apr + may + jun) / 3 * 1.1;
    } else {
        jul = (apr + may + jun) / 3 * 0.9;
    }
    let aug = 0;
    if (jul > jun) {
        aug = (may + jun + jul) / 3 * 1.1;
    } else {
        aug = (may + jun + jul) / 3 * 0.9;
    }
    let sep = 0;
    if (aug > jul) {
        sep = (jun + jul + aug) / 3 * 1.1;
    } else {
        sep = (jun + jul + aug) / 3 * 0.9;
    }
    let oct = 0;
    if (sep > aug) {
        oct = (jul + aug + sep) / 3 * 1.1;
    } else {
        oct = (jul + aug + sep) / 3 * 0.9;
    }
    let nov = 0;
    if (oct > sep) {
        nov = (aug + sep + oct) / 3 * 1.1;

    } else {
        nov = (aug + sep + oct) / 3 * 0.9;
    }
    let dec = 0;
    if (nov > oct) {
        dec = (sep + oct + nov) / 3 * 1.1;
    } else {
        dec = (sep + oct + nov) / 3 * 0.9;

    }

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

function convertToFireBase(obj) {
    const smartVal = getCookie("searchQuery")
    db.collection('predefined-searches').doc(smartVal).set({
            object: obj,
        }).then(function() {

        })
        .catch(function(error) {

        });;
}
let Predictions = [];
try {
    const smartVal = getCookie("searchQuery")
    userData = db.collection("predefined-searches").doc(smartVal);
    userData.get().then(function(doc) {
        if (doc.exists) {
            Predictions = doc.get("object");
            loadTable(Predictions);
            setSearchQuery();
            stopLoading();

        } else {
            console.log("No such document!");
            document.getElementById("results_query").innerHTML = "Looks Like This Search Query Has No Stored Data!";
            stopLoading();

        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
        document.getElementById("results_query").innerHTML = "Looks Like This Search Query Has No Stored Data!";

        stopLoading();

    });
} catch (exception) {
    console.log(exception)
    document.getElementById("results_query").innerHTML = "Looks Like This Search Query Has No Stored Data!";
}


function loadTable(streamData) {
    convertToFireBase(streamData);
    let PredictionMonths = [];
    for (var x = 0; x < streamData.length; x++) {
        PredictionMonths.push(calculate(streamData[x]))
    }
    if (streamData.length > 0) {
        setSearchQuery();
    }
    console.log(PredictionMonths)
    let table = document.getElementById("mainTable");
    table.innerHTML = "<tr><th> Company </th><th> Year </th> <th> January </th> <th> February </th> <th> March </th> <th> April </th> <th> May </th> <th> June </th> <th> July </th> <th> August </th> <th> September </th> <th> October </th> <th> November </th> <th> December </th><th> Total Predicted Sales </th></tr>";
    for (var i = 0; i < PredictionMonths.length; i++) {
        table.innerHTML += "<tr><th><a href='#' onclick='genGraph(\"" + PredictionMonths[i].Company + "\")'>" + PredictionMonths[i].Company + "</a></th><th>" + PredictionMonths[i].Year + "</th><th>" + PredictionMonths[i].January + "</th><th>" + PredictionMonths[i].Febuary + "</th><th>" + PredictionMonths[i].March + "</th><th>" + PredictionMonths[i].April + "</th><th>" + PredictionMonths[i].May + "</th><th>" + PredictionMonths[i].June + "</th><th>" + PredictionMonths[i].July + "</th><th>" + PredictionMonths[i].August + "</th><th>" + PredictionMonths[i].September + "</th><th>" + PredictionMonths[i].October + "</th><th>" + PredictionMonths[i].November + "</th><th>" + PredictionMonths[i].September + "</th><th>" + PredictionMonths[i].Total + "</th></tr>";
    }

}

function genGraph(company) {
    document.getElementById('myChart').innerHTML = ""
    let smartVal = 0;
    for (var x = 0; x < Predictions.length; x++) {
        if (Predictions[x].Company == company) {
            smartVal = x;
            break;
        }
    }
    let useGraph = calculate(Predictions[smartVal])
    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [{
                label: company,
                data: [useGraph.January,
                    useGraph.Febuary,
                    useGraph.March,
                    useGraph.April,
                    useGraph.May,
                    useGraph.June,
                    useGraph.July,
                    useGraph.August,
                    useGraph.September,
                    useGraph.October,
                    useGraph.November,
                    useGraph.December
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                labels: {
                    fontColor: "white",
                    fontSize: 18
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontColor: "white"
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: "white"
                    }
                }],
            }
        }
    });
}

function genRand() {
    let company = prompt("Enter Company")
    let year = 2020;
    let min = 10000;
    let max = 90000;
    let jan = Math.floor(Math.random() * (max - min + 1) + min);
    let feb = Math.floor(Math.random() * (max - min + 1) + min);
    let mar = Math.floor(Math.random() * (max - min + 1) + min);

    Predictions.push({
        Company: company,
        Year: year,
        January: jan,
        Febuary: feb,
        March: mar
    })
    loadTable(Predictions)
}

function addYear() {
    let company = prompt("Which Company Are You Forecasting");
    let year = Number(prompt("Please enter the year for this forecast"));
    let jan = Number(prompt("Please enter January's Value"));
    let feb = Number(prompt("Please enter February's Value"));
    let mar = Number(prompt("Please enter March's Value"));
    if (company == "" || year == "" || jan == "" || feb == "" || mar == "") {
        alert("Please make sure to only enter valid data!")
    } else {
        Predictions.push({
            Company: company,
            Year: year,
            January: jan,
            Febuary: feb,
            March: mar
        })
        loadTable(Predictions)
    }


}

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