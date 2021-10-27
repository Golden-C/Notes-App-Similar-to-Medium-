const nodemailer = require('nodemailer')
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NM_EMAIL,
        pass: process.env.NM_PASS,
    }

})
const sendMail = (subject:string, Email:string, body: string) => {
    let mailOptions = {
        from: process.env.NM_EMAIL,
        to: Email,
        subject: subject,
        html: body
    }
    return transporter.sendMail(mailOptions, (err:any, data:any) => {
        if (err) {
            console.log('Error Occurred: ', err)
        }
        // console.log( data)
    })
}
export default sendMail;
