var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');


//Firebase Real Time
var firebase = require("firebase-admin");
var serviceAccount = require("./firebase_key.json");

firebase.initializeApp({
	credential: firebase.credential.cert(serviceAccount),
	databaseURL: "https://book-shop-52852-default-rtdb.asia-southeast1.firebasedatabase.app"

});

var db = firebase.database();
var port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/books', function (req, res) {

	res.setHeader('Content-Type', 'application/json');

	var booksReference = db.ref("books");
	//Attach an asynchronous callback to read the data
	booksReference.on("value",
		function (snapshot) {
			res.json(snapshot.val());
			booksReference.off("value");
		},
		function (errorObject) {
			res.send("The read failed: " + errorObject.code);


		});


});



app.post('/plus', function (req, res) {
	res.setHeader('Content-Type', 'application/json');

	var num1 = req.body.num1;
	var num2 = req.body.num2;

	res.send('{ "resulf": ' + (num1 + num2) + '}');


});
app.post('/rectangle', function (req, res) {
	res.setHeader('Content-Type', 'application/json');

	var width = req.body.width;
	var long = req.body.long;

	res.send('{ "area": ' + (width * long) + '}');


});
app.post('/circle', function (req, res) {
	res.setHeader('Content-Type', 'application/json');

	var radius = req.body.radius;

	res.send('{ "area": ' + (radius * radius * 3.14) + '}');


});
app.get('/books/:bookid', function (req, res) {

	res.setHeader('Content-Type', 'application/json');
	var bookid = Number(req.params.bookid);

	var booksReference = db.ref("books");

	//Attach an asynchronous callback to read the data
	booksReference.orderByChild("bookid").equalTo(bookid).on("child_added",
		function (snapshot) {
			res.json(snapshot.val());
			booksReference.off("value");
		},
		function (errorObject) {
			res.send("The read failed: " + errorObject.code);
		});

});
app.get('/student/:studentid', function (req, res) {

	res.setHeader('Content-Type', 'application/json');
	var studentid = req.params.studentid;

	var booksReference = db.ref("students");

	//Attach an asynchronous callback to read the data
	booksReference.orderByChild("studentid").equalTo(studentid).on("child_added",
		function (snapshot) {
			res.json(snapshot.val());
			booksReference.off("value");
		},
		function (errorObject) {
			res.send("The read failed: " + errorObject.code);
		});
});


app.get('/topsellers', function (req, res) {

	res.setHeader('Content-Type', 'application/json');

	var booksReference = db.ref("topsellers");

	//Attach an asynchronous callback to read the data
	booksReference.on("value",
		function (snapshot) {
			res.json(snapshot.val());
			booksReference.off("value");
		},
		function (errorObject) {
			res.send("The read failed: " + errorObject.code);
		});

});


app.get('/book/:bookid', function (req, res) {

	//Code Here

});

app.delete('/book/:bookid', function (req, res) {

	//Code Here
	
	var bookid = Number(req.params.bookid);

	var referencePath ='/books/' + bookid + '/';
	var booksReference = db.ref(referencePath);
	
	if (booksReference!=null){
		booksReference.remove()
		res.send("Success!!")
	
	}
	if (error) throw error;

});

app.delete('/student/:students', function (req, res){

    var students = req.params.students;

    var referencePath = '/students/' + students + '/';
    var studentsReference = db.ref(referencePath);
    if (studentsReference != null){
        studentsReference.remove()
        res.send("Succrss!!")
    }
    if (error) throw error;

});

app.get('/lastorderid', function (req, res) {

	res.setHeader('Content-Type', 'application/json');

	var ordersReference = db.ref("lastOrderId");

	ordersReference.on("value",
		function (snapshot) {
			res.json(snapshot.val());
			ordersReference.off("value");
		},
		function (errorObject) {
			res.send("The read failed: " + errorObject.code);
		});

});


app.put('/lastorderid', function (req, res) {

	//Code Here


});






app.post('/book', function (req, res) {

	var author = req.body.author;
	var bookid = Number(req.body.bookid);
	var category = req.body.category;
	var isbn = req.body.isbn;
	var pageCount = Number(req.body.pageCount);
	var price = Number(req.body.price);
	var publishedDate = req.body.publishedDate;
	var shortDescription = req.body.shortDescription;
	var thumbnailUrl = req.body.thumbnailUrl;
	var title = req.body.title;


	var referencePath = '/books/' + bookid + '/';

	var booksReference = db.ref(referencePath);

	if (booksReference != null) {
		booksReference.update({
			author: author, bookid: bookid, category: category, isbn: isbn, pageCount: pageCount,
			price: price, publishedDate: publishedDate, shortDescription: shortDescription, thumbnailUrl: thumbnailUrl, title: title
		},
			function (error) {
				if (error) {
					res.send("Data could not be saved." + error)
				}
				else {
					res.send("Success!!");

					
				}
			}
		);

	}


});


app.post('/student', function (req, res) {
    var students = Number(req.body.students);
    var studentid = req.body.studentid;
    var studentname = req.body.studentname;

    var referencePath = '/students/' + students + '/';
    var studentsReference = db.ref(referencePath);


    if (studentsReference != null) {

        studentsReference.update({ studentid:studentid, studentname:studentname },
            function (error) {
                if (error) {
                    res.send("Data could not be saved." + error)
                }
                else {
                    res.send("Success!!");
                }

            }

        );
    }

});













app.listen(port, function () {
	console.log("Server is up and running...");
});



