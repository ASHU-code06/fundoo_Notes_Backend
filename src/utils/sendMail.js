import dotenv from 'dotenv';
dotenv.config();

const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const CLIENT_ID =
  '263925228951-1okltfh1ld0kti9be52859h420j2p82i.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN =
  '1//04IMSep-aiVndCgYIARAAGAQSNwF-L9IrOXtzg-rf-Eir_S6AK_SYSNq6W7puxPKeydvlVLJsxv5MLsLd0fzm2zrVXzJgCYD5P1M';

const oAuth2client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2client.setCredentials({ refresh_token: REFRESH_TOKEN });

export async function sendMail(email, token) {
  try {
    const accessToken = await oAuth2client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'ashuc306@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken
      }
    });

    const mailOPtions = {
      from: 'ASHU<ashuc306@gmail.com> ',
      to: email,
      subject: 'RESET PASSWORD',
      text: 'YOU CAN RESET YOUR PASSWORD',
      html: '<h1>........</h1>'
    };

    const result = await transport.sendMail(mailOPtions);
    return result;
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
}
export default sendMail;
