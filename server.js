require('dotenv').config()
// const sendEmail = require("./utils/sendEmail")
//
// const TestSendEmail = async ()=>{
//     await sendEmail({
//         email : 'sanketshirsath226@gmail.com',
//         text : 'Hello'
//     })
// }
//
// TestSendEmail().then(r => console.log(r))

const express = require('express');
const bodyParse = require('body-parser');
const router = express.Router();
const app = express();
const {TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN,TWILIO_SERVICE_SID} = process.env
const client = require('twilio')(TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN,{
    lazyLoading : true
})

router.route('/send-otp').post(
    async  (req, res, next)=>{
        const {countryCode,phoneNumber} = req.body;
        try{
            const otpResponse = await client.verify.v2.services(TWILIO_SERVICE_SID)
                .verifications.create({
                    body : 'Hello Everyone',
                    to : `+${countryCode}${phoneNumber}`,
                    channel : 'sms',
                });
            console.log(otpResponse)
            res.status(200).send(`OTP send Successfully !: ${JSON.stringify((otpResponse))}`)
        }catch (error){
            res.status(error?.status || 400).send(error?.message || 'Something went wrong!');
        }
    }
)
router.route('/verify-otp').post(
    async  (req, res, next)=>{
            const {countryCode,phoneNumber,otp} = req.body;
            try{
                const verificationResponse = await client.verify.v2.services(TWILIO_SERVICE_SID).verificationChecks.create({
                    to : `+${countryCode}${phoneNumber}`,
                    code : otp,
                })
                console.log(verificationResponse)
                res.status(200).send(`OTP verified Successfully !: ${JSON.stringify((verificationResponse))}`)
            }catch (error){
                res.status(error?.status || 400).send(error?.message || 'Something went wrong!');
            }
    }
)
const {PORT} = process.env;
const port = 8080 || PORT;
const jsonParser = bodyParse.json()

app.use(jsonParser);
app.use('/twilio-sms',router)
app.get('/',()=>{
    console.log('App Demo')
})

app.listen(port,()=>{
    console.log(`Server started listen to the port ${port}`)
})
