var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');


//Firebase Real Time
var firebase = require("firebase-admin");
var serviceAccount = require("./firebase_key.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
	databaseURL: "https://book-shop-b1a1d-default-rtdb.asia-southeast1.firebasedatabase.app"
});

var db = firebase.database();
var port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/books',  function (req, res)  {  

	res.setHeader('Content-Type', 'application/json');

	var booksReference = db.ref("books");
	//Attach an asynchronous callback to read the data
	booksReference.on("value", 
				function(snapshot) {					
					res.json(snapshot.val());
					booksReference.off("value");
					}, 
				function (errorObject) {
					res.send("The read failed: " + errorObject.code);

  
});


});  



app.post('/plus',  function (req, res)  {  
	res.setHeader('Content-Type', 'application/json');

	var num1 = req.body.num1;
	var num2 = req.body.num2;

	res.send('{ "resulf": '+ (num1+num2)+ '}');


});
app.post('/rectangle',  function (req, res)  {  
	res.setHeader('Content-Type', 'application/json');

	var width = req.body.width;
	var long = req.body.long;

	res.send('{ "area": '+ (width*long)+ '}');


});
app.post('/circle',  function (req, res)  {  
	res.setHeader('Content-Type', 'application/json');

	var radius = req.body.radius;

	res.send('{ "area": '+ (radius*radius*3.14)+ '}');


});
app.get('/books/:bookid',  function (req, res)  {  

	res.setHeader('Content-Type', 'application/json');
		var bookid = Number(req.params.bookid);

		var booksReference = db.ref("books");

		//Attach an asynchronous callback to read the data
		booksReference.orderByChild("bookid").equalTo(bookid).on("child_added", 
					function(snapshot) {					
						res.json(snapshot.val());
						booksReference.off("value");
						}, 
					function (errorObject) {
						res.send("The read failed: " + errorObject.code);
					});
  
});
app.get('/student/:studentId',  function (req, res)  {  

	res.setHeader('Content-Type', 'application/json');
		var studentId = req.params.studentId;

		var booksReference = db.ref("students");

		//Attach an asynchronous callback to read the data
		booksReference.orderByChild("studentId").equalTo(studentId).on("child_added", 
					function(snapshot) {					
						res.json(snapshot.val());
						booksReference.off("value");
						}, 
					function (errorObject) {
						res.send("The read failed: " + errorObject.code);
					});
});					


app.get('/topsellers',  function (req, res)  {  

		res.setHeader('Content-Type', 'application/json');

		var booksReference = db.ref("topsellers");
	
		//Attach an asynchronous callback to read the data
		booksReference.on("value", 
					function(snapshot) {					
						res.json(snapshot.val());
						booksReference.off("value");
						}, 
					function (errorObject) {
						res.send("The read failed: " + errorObject.code);
					});
  
});


app.get('/book/:bookid',  function (req, res)  {  
  	
		//Code Here

});

app.delete('/book/:bookid',  function (req, res)  {  
  	
	//Code Here

	

});


app.get('/lastorderid',  function (req, res)  {  
  	
	res.setHeader('Content-Type', 'application/json');

	var ordersReference = db.ref("lastOrderId");

	ordersReference.on("value", 
				function(snapshot) {					
					res.json(snapshot.val());
					ordersReference.off("value");
					}, 
				function (errorObject) {
					res.send("The read failed: " + errorObject.code);
			});

});


app.put('/lastorderid',  function (req, res)  {  
	
	//Code Here


});




app.listen(port, function () {
    console.log("Server is up and running...");
});
