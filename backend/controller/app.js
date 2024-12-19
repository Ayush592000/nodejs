const { get } = require('mongoose');
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen')
//send mail from testing account
const signup = async (req, res) => {
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D",
      },
    });

    // Mail details
    const mailOptions = {
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    };

    // Send mail and get result
    const result = await transporter.sendMail(mailOptions);

    // Respond with success
    res.status(201).json({
      message: "Mail sent successfully!",
      messageId: result.messageId,
      preview: nodemailer.getTestMessageUrl(result), // Generate preview URL
    });
  } catch (err) {
    // Respond with error
    res.status(500).json({
      error: "Failed to send mail",
      details: err.message,
    });
  }
};

/* send mail from real gmail account */
const getSignUp = async (req, res) => {
  const { userMail } = req.body;
  console.log(req.body)
  let config = {
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  }
  let transporter = nodemailer.createTransport(config)
  let MailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'Mailgen',
      link: 'https://mailgen.js/'
    }
  })
  let response = {
    body: {
      name: 'check email',
      intro: 'Your bill has arrived!',
      table: {
        data: [
          {
            item: 'Nodemailer Stack book',
            description: 'A Backend Application',
            price: '$10.99'
          }
        ]
      },
      outro: "Looking forward to do more buisness"
    }
  }
  let mail = MailGenerator.generate(response)
  let message = {
    from: process.env.EMAIL,
    to: userMail,
    subject: 'place order',
    html: mail
  }
  transporter.sendMail(message).then(() => {
    return res.status(201).json({
      msg: 'your should receive an email'
    })
  }).catch((err) => {
    return res.staus(500).json({ err })
  })
}

module.exports = {
  signup,
  getSignUp
};
