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
	from: 'olaredenish1995@gmail.com',
	to:'jropacho57@gmail.com',
	subject: 'Sending Greetings from eversees, the country of China!',
	text: 'How is the country Kenya. What are the progress of your elecred leaders?'
};

transporter.sendMail(mailOptions, function(error, info){
	if (error) {
		console.log(error);
	} else {
		console.log('Email sent: ' + info.response);
	}
});
