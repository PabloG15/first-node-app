const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { google } = require ('googleapis');
const appName= "First Node App";

router.get('/',(req,res)=>{
    res.render('index.html', {appTitle : "First Node App", pageTitle : `Home || ${appName}`});
})
router.get('/about-page', (req,res)=>{
    res.render('about.html', {appTitle : "First Node App", pageTitle : `About || ${appName}`})
});

router.get('/contact', (req, res)=>{
    res.render('contact.html', {appTitle : "First Node App", pageTitle : `Contact || ${appName}`})
})

router.post('/send-email', (req,res) =>{
    const {name, email, phone, message} = req.body
    contentHTML=`
        <h1>Datos del Email</h1>
        <ul>
            <li>Nombre: ${name}</li>        
            <li>Email: ${email}</li>        
            <li>Numero de Telefono: ${phone}</li>        
            <li>Mensaje: ${message}</li>        
        </ul>
    `;
    
    const CLIENT_ID= "827631440556-j9h3itdcj0kmvkpa5312dar6kll1f8mm.apps.googleusercontent.com";
    const CLIENT_SECRET= "78Xc5fhWwZiN3IeG2pzOXVCa";
    const REDIRECT_URI="https://developers.google.com/oauthplayground";
    const REFRESH_TOKEN="1//04M6bDLmRS8heCgYIARAAGAQSNwF-L9Ir8WFWvGS6WrQzsvyIGmqZlbZ4mZLcDOi7HcMsEtVQ8ihO5Y1UvC6goMCOCs3XRn8khs4";

    const oAuth2Client= new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI);
    
    oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

    async function sendMail (){
        try{
            const accessToken= await oAuth2Client.getAccessToken();
            const transporter= nodemailer.createTransport({
                service: "gmail",
                auth: {
                    type: "OAuth2",
                    user : "p.gamarra.jara.1503@gmail.com",
                    clientId: CLIENT_ID,
                    clientSecret: CLIENT_SECRET,
                    refreshToken: REFRESH_TOKEN,
                    accessToken: accessToken,
                },
            })
            const mailOptions= {
                from: "First App Web",
                to:"pgamarra1503@gmail.com",
                subject: "Pruebas First Node APP",
                html: contentHTML,
            };
            
            const result = await transporter.sendMail(mailOptions)
            return result;
            
        } catch(err){
            console.log(err.message);
        }
    }
    sendMail()
    .then(console.log("Enviado"), res.send('Enviado'))
    .catch((error)=>console.log(error.message));
    
    console.log(contentHTML);
})
module.exports = router;