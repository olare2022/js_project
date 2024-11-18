require('dotenv').config();
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS
	}
});

var mailOptions = {
	from: 'olareexample@gmail.com',
	to:'jrotyugu@gmail.com',
	subject: 'Sending Greetings from eversees, the country of China!',
	text: 'How is the country Kenya. What are the progress of your cancer treatment?'
};

transporter.sendMail(mailOptions, function(error, info){
	if (error) {
		console.log(error);
	} else {
		console.log('Email sent: ' + info.response);
	}
});
