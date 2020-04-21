// Dependencies
// ===============================================================
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Data
// ===============================================================
let reservations = [
    // {
    //
    //     name: "Anthony",
    //     phoneNumber: 5201457895 ,
    //     email: "anthony@gmail.com",
    //     uniqueId: 1
    // },

];

let waitList = [
    // {
    //
    //     name: "John",
    //     phoneNumber: 5203247354 ,
    //     email: "john@gmail.com",
    //     uniqueId: 2
   // },
];

//Routes
//================================================================

//Root directory serves home.html
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/api/reservations", function(req, res) {
    res.json(reservations);
});

app.get("/api/waitlist", function(req, res) {
    res.json(waitList);
});

     // Create New Customers - takes in JSON input
     app.post("/api/reservations", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newCustomer = req.body;

    console.log(newCustomer);

    if( reservations.length >= 5 )
    {
        waitList.push(newCustomer);

        console.log(waitList[waitList.length-1].name + " is number " + (waitList.length) + " on the wait list");

    }else{
        reservations.push(newCustomer);

        console.log(reservations[reservations.length-1].name + " has a reservation on table : " + reservations.length);

        if(reservations.length === 5){
            console.log("=======================  Reservations Limit =======================");
            console.log(" ");
            console.log(" ");
            console.log("======================== Begin WaitList ===========================");
        }
    }

    res.json(newCustomer);
});

app.post("/api/clear", function(req, res) {

    reservations.length = 0;
    waitList.length = 0;

    res.json({ ok: true });
});

//listener_____________________________________
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});