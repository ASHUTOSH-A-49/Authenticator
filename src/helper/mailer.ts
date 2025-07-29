// Domain.com/verifytoken/Token_key    (Better for the server component)
// alt way 
// domain.com/verifytoken>token = uhasshfduhsf  (better for client component)

import nodemailer from 'nodemailer';

import User from '@/models/userModel';

import bcrypt from 'bcryptjs';

const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        //creating our hashed token  
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        // add some things into the token 
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyPasswordExpiry: Date.now() + 360000000, //time is in ms so 36 hours 
            })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordExpiry: Date.now() + 360000000, //time is in ms so 36 hours 
            })
        }

        // now we will use the nodemailer to create a transport 

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS
            }
        });


        const mailOptions = {
            from:'ashupoco66@gmail.com',
            to:email,
            subject:emailType==="VERIFY"?'Verify Your Email' : 'Reset Password for your account',
            html:`<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here to ${emailType === "VERIFY"?"verify your email":"reset your password"}</p>`
        }

        // next step is to send email with these email options 
        const mailResponse = await transporter.sendMail(mailOptions);
        console.log("MAIL Response: ",mailResponse);
        return mailResponse;


    } catch (error: any) {
        throw new Error(error.message)
    }
}


