const {TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN,TWILIO_SERVICE_SID} = process.env
const client = require('twilio')(TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN,{
    lazyLoading : true
});

const sendVerify = async  (countryCode,phoneNumber,otp) =>{
    try{
        const verificationResponse = await client.verify.v2.services(TWILIO_SERVICE_SID).verificationChecks.create({
            to : `+${countryCode}${phoneNumber}`,
            code : otp,
        })
        console.log(verificationResponse)
        return {
            status :true,
            message : '`OTP verified Successfully'
        }
    }catch (error){
        return {
            status : false,
            message : 'Something Went Wrong'
        }
    }
}
module.exports = sendVerify
