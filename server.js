require('dotenv').config()
const sendEmail = require("./utils/sendEmail")

const TestSendEmail = async ()=>{
    await sendEmail({
        email : 'sanketshirsath226@gmail.com',
        text : 'Hello'
    })
}

TestSendEmail().then(r => console.log(r))