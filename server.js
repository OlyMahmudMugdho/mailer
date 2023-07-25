const express = require("express");
const app = express();
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));


app.get('/', async (req, res) => {
    const send = async () => {
        let transporter = nodemailer.createTransport({
            host: "smtp-relay.sendinblue.com",
            port: 587,
            auth: {
                user: process.env.EMAILID,
                pass: process.env.PASSWORDFORMAIL,
            }
        });
        let mailOptions = {
            from: process.env.FROM,
            to: process.env.TO,
            subject: 'Leonel Messi',
            text : 'how funny',
        };
    
        await transporter.sendMail(mailOptions, (err,data) => {
            if(err) {
                console.log(err);
                return res.status(404).json({
                    "error" : "mail not sent"
                });
            }
            
                console.log(data);
                return res.status(200).json({
                    "message" : "mail sent"
                });
        })
    }

    await send();
});

app.listen(5000, (req, res) => {
    console.log("Server is running at http://localhost:5000");
});