const {TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN,TWILIO_SERVICE_SID} = process.env
const client = require('twilio')(TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN,{
    lazyLoading : true
});
const sendOtp = async (countryCode,phoneNumber) =>{
    try{
        const otpResponse = await client.verify.v2.services(TWILIO_SERVICE_SID)
            .verifications.create({
                body : 'Hello Everyone',
                to : `+${countryCode}${phoneNumber}`,
                channel : 'sms',
            });
        console.log(`OTP send Successfully !: ${JSON.stringify((otpResponse))}`)
        return {
            status :true,
            message : '`OTP send Successfully'
        }
    }catch (error){
        console.log(error)
        return {
            status : false,
            message : 'Something Went Wrong'
        }
    }
}
module.exports = sendOtp
