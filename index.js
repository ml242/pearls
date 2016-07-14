const express = require('express');
const app = express();
var mg = require('nodemailer-mailgun-transport');
var bodyParser = require('body-parser')


const router = express.Router();

const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');


app.use(express.static('public'));

app.use(bodyParser.urlencoded({
	extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false });


app.get('/', router);

//router.post('/contact', jsonParser, sendEmail); // handle the route at yourdomain.com/sayHello
 app.post('/contact', function(req, response){

	 sendEmail(req.body)
 }); // handle the route at yourdomain.com/sayHello

function sendEmail(data) {

	// console.log('request received in sendEmail')


  var auth = {    auth: {
        api_key: process.env.mailgunPearlsAPI,
      	domain: mailgunPearlsDomain
  	}
  }

  var nodemailerMailgun = nodemailer.createTransport(mg(auth));



	nodemailerMailgun.sendMail({
  		from: data.email, // sender address
	    to: 'ml242@nyskiblog.com', // list of receivers
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


const port = 3000;
//
//app.get('/', (request, response) => {
//  response.sendfile(index)
//});

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
});
