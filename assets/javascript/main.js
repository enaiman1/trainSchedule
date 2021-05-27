
//initalize firebase
var config = {
    apiKey: "AIzaSyBK9cwpi1M_maPcAEyeBA4sU5sh5bJ83xs",
    authDomain: "trainschedule-c43a2.firebaseapp.com",
    databaseURL: "https://trainschedule-c43a2.firebaseio.com",
    projectId: "trainschedule-c43a2",
    storageBucket: "trainschedule-c43a2.appspot.com",
    messagingSenderId: "1080968976559"
};
firebase.initializeApp(config);

//   creating a connection to the firebase database
var db = firebase.database();

// displays current time
var currentTime = null;

function updateTime() {
    // connecting the variable current time to moment.js
    currentTime = moment().format("HH:mm:ss");
    $("#currentTime").html(currentTime);
}

$(document).ready(function () {
    updateTime();
    setInterval(updateTime, 1000);
});


//create a button with an onclick event so user can submit a train
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // create variables and attach them to the id's from our html (this will grab user input)
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainTime = $("#train-time-input").val().trim();
    var trainFrequency = parseInt($("#frequency-input").val().trim()); // using parseInt to turns the string from user input to actualy number


    // local temporary object for storing train data
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency
    };

    // send train data to firebase
    db.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);

    alert("Train successfully added!");

    // clear text boxes after button to submit has been touched
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#train-time-input").val("");
    $("#frequency-input").val("");

    // prevent loading a new page
    return false;


});
// add the next child into the database

function addTrain(childSnapshot) {
    
    var train = {
        trainName: childSnapshot.val().name,
        trainDestination: childSnapshot.val().destination,
        trainTime: childSnapshot.val().time,
        trainFrequency: childSnapshot.val().frequency,
        minutesAway: 0,
        nextArrival: ""
    }

    //convert the train time

	var timeConverted = moment(train.trainTime, "HH:mm");
    console.log("Time converted: " + timeConverted);

    //calculate the difference between first train time and current time
    var timeDiff = moment().diff(moment(timeConverted), "minutes");
    console.log("Difference in time: " + timeDiff);

    //calculate minutes until next train
    var remainder = timeDiff % train.trainFrequency;
    console.log("Remainder: " + remainder);
    console.log("Train Frequency: " + train.trainFrequency);
    
    train.minutesAway = train.trainFrequency - remainder;
    console.log("Minutes away: " + train.minutesAway);

    //calculate next train
    var nextTrain = moment().add(train.minutesAway, "minutes");

    //arrival time
    train.nextArrival = moment(nextTrain).format("hh:mm");
    console.log("Next arrival: " + train.nextArrival);

    // add each train's data into table
    $("#new-train").append("<tr><td>" + 
                          train.trainName + "</td><td>" + 
                           train.trainDestination + "</td><td>" + "Every: " + 
                           train.trainFrequency + " min"+ "</td><td>" + 
                           train.nextArrival + "</td><td>" + 
                           train.minutesAway + " min" + "</td></tr>");
}


//create firebase event for adding train to database and adds a row to html
db.ref().on("child_added", function(childSnapshot){

    addTrain(childSnapshot);

}, function(errorObject) {
console.log("Error handled: " + errorObject.code);
});

setInterval(function(){
    location.reload(true);
}, 60000);

// rotating background 

// call a function that will take an array of picture and randomly post it when the page loads
  function randomImage(){
      var images = [

        "https://download.unsplash.com/photo-1428278953961-a8bc45e05f72",
        "https://hdwallsource.com/img/2014/5/stunning-train-track-wallpaper-37962-38832-hd-wallpapers.jpg",
        "https://ak3.picdn.net/shutterstock/videos/25604573/thumb/1.jpg",
         "https://s.hdnux.com/photos/23/06/41/5007478/5/920x920.jpg",
         "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/North_Thompson_River.jpg/1200px-North_Thompson_River.jpg"
      ]

    //   create a variable the willl take the length of an array
      var carousel = images.length;

    //   takes the array and randomly chooses a an image
      var rotate = Math.floor(carousel * Math.random());
      console.log(rotate);
    //   connect to the div with a a class name of home-intro
      var element = document.getElementsByClassName("homeIntro");
      console.log(element);
    //   styles the random picture into the css
      element[0].style["background-image"] = "url(" + images[rotate] +")"
  }

  document.addEventListener("DomContentLoaded", randomImage());