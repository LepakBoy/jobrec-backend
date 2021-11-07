const nodmailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
require("dotenv");

module.exports = {
  verificationAccount: (data) =>
    new Promise((resolve, reject) => {
      const transporter = nodmailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_SENDER,
          pass: process.env.EMAIL_SENDER_PASS,
        },
      });

      transporter.use(
        "compile",
        hbs({
          viewEngine: {
            extname: ".html",
            partialsDir: path.resolve("./src/template/email"),
            defaultLayout: false,
          },
          viewPath: path.resolve("./src/template/email"),
          extName: ".html",
        })
      );
      const mailOptions = {
        from: '"Jobrec"  <lepakdev@gmail.com>',
        to: data.to,
        subject: data.subject,
        template: data.template,
        context: data.data,
      };
      if (data.attachment || data.attachment.length > 0) {
        mailOptions.attachment = data.attachment;
      }
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info.response);
        }
      });
    }),
};
