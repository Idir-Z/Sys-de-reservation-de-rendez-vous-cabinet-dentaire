const { google } = require('googleapis');
const nodemailer = require('nodemailer');
const CLIENT_ID = ''
const CLIENT_SECRET = ''
const REFRESH_TOKEN = '1//04vLV3ozc2eGFCgYIARAAGAQSNwF-L9IrqHhgp4P6bH651pTEAMfiLT69VJPKpEoTfqEItwXHWp7BJmf1H0Qr7cmhQqbEvK7o14w'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const MY_EMAIL = 'idirdidouzeg@gmail.com'
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({refresh_token : REFRESH_TOKEN})

const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: 'https://www.googleapis.com/auth/gmail.send',
});

// Redirect the user to `authUrl` to grant permissions

// Assuming `authorizationCode` is obtained from the callback
const { tokens } =  oAuth2Client.getToken(authorizationCode).then(console.log('token getting done'))
const refreshToken = tokens.refresh_token;



// Create Nodemailer transporter with OAuth2
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'idir.zeggane@se.univ-bejaia.dz', // Your Gmail address
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: refreshToken,
    accessToken: tokens.access_token,
  },
});

// Send verification email
const mailOptions = {
  from: 'idir.zeggane@se.univ-bejaia.dz',
  to: 'idirdidouzeg@gmail.com',
  subject: 'Verification Email',
  text: 'Please verify your email address.',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error sending email:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});
