$(document).ready(function () {
    // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDiT8lNfvybMwmO3DUDiVLAhST5PBKx-YU",
    authDomain: "my-first-project-cd54c.firebaseapp.com",
    databaseURL: "https://my-first-project-cd54c.firebaseio.com",
    projectId: "my-first-project-cd54c",
    storageBucket: "my-first-project-cd54c.appspot.com",
    messagingSenderId: "235291466174"
  };

    firebase.initializeApp(config);

    var database = firebase.database();

    $("#add-train-btn").on("click", function (event) {
        event.preventDefault();
        var name = $("#name").val().trim();
        var destination = $("#destination").val().trim();
        var time = $("#time").val().trim();
        var frequency = $("#frequency").val().trim();
        var newTrain = {
            name: name,
            destination: destination,
            time: time,
            frequency: frequency
        };

        database.ref().push(newTrain);

        $("#name-input").val("");
        $("#destination-input").val("");
        $("#time-input").val("");
        $("#frequency-input").val("");

        
    })

    database.ref().on("child_added", function (childSnapshot, prevChildKey) {

        var name = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var time = childSnapshot.val().time;
        var frequency = childSnapshot.val().frequency;

        var cTime = moment(time, "hh:mm").subtract(1, "years");
        
        var timeNow = moment();
        
        var difference = moment().diff(moment(cTime), "minutes");
        
        var timeLeft = difference % frequency;
        
        var tilltrain = frequency - timeLeft;
        
        var nextTrain = moment().add(tilltrain, "minutes").format("hh:mm a");
    
    
        $("#schedule > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" +
        frequency + "</td><td>" + nextTrain + "</td><td>" + tilltrain + "</td></tr>");

    })

    
        
})