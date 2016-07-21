const express = require('express');
const app = express();
var mg = require('nodemailer-mailgun-transport');
var path = require('path');
var bodyParser = require('body-parser')


const router = express.Router();

const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');


//app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({
		extended: true
	})
);

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false });



app.get('/', router);

//router.post('/contact', jsonParser, sendEmail); // handle the route at yourdomain.com/sayHello
 app.post('/contact', function(req, response){
	 sendEmail(req.body);
	 response.json({"done" : true, "status" : 200});
 });

app.post('/vendor', function(req, response){
	if (req.body.pass == "pbsvendors") {
		console.log('ok password');
		response.render(__dirname + "/public/vendor.html");
	} else {
		console.log('failed password')
		response.json({"done" : true, "msg": "Unauthorized", "status" : 401});
	}
}); // handle the route at yourdomain.com/sayHello

function sendEmail(data) {

	// console.log('request received in sendEmail')


  var auth = {
  	auth: {
        api_key: process.env.mailgunPearlsAPI,
      	domain: process.env.mailgunPearlsDomain
  	}
  }

  var nodemailerMailgun = nodemailer.createTransport(mg(auth));



	nodemailerMailgun.sendMail({
  		from: data.email, // sender address
	    to: 'himo@pearlsbeforeswine.ca', // list of receivers
	    subject: "from " + data.fullName + ":" + data.subject, // Subject line
	    text: data.message, //, // plaintext body

	}, function (err, info) {
  	if (err) {
    	console.log('Error: ' + err);
  	} else {
    	console.log('Response: ' + info);
  	}
	});
};

app.use("*",function(req,res){
	//res.sendFile(__dirname + "/public/404.html");
});

const port = 3000;

app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
});


