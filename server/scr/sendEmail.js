const nodemailer = require('nodemailer');

const email = (req, res, next) =>{ 
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        }
    });

    var mailOptions = {
        from: 'testprojectstat@gmail.com',
        to: 'patoneill0010@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
};

module.exports = {
    email
};
