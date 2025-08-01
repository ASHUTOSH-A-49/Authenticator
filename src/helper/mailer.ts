// Domain.com/verifytoken/Token_key    (Better for the server component)
// alt way 
// domain.com/verifytoken>token = uhasshfduhsf  (better for client component)

import nodemailer from 'nodemailer';

import User from '@/models/userModel';

import bcrypt from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        //creating our hashed token  
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        // add some things into the token 
        if (emailType === "VERIFY") {
    await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000 * 36 // 36 hours
    });
} else if (emailType === "RESET") {
    await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordExpiry: Date.now() + 3600000 * 36
    });
}


        // now we will use the nodemailer to create a transport 

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                // user: process.env.MAILTRAP_USER,
                // pass: process.env.MAILTRAP_PASS
                user: "4cf7b853772b98",
                pass: "e950564c887772"
            }
        });


        const mailOptions = {
            from:'ashupoco66@gmail.com',
            to:email,
            subject:emailType==="VERIFY"?'Verify Your Email' : 'Reset Password for your account',
            html:`<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here to ${emailType === "VERIFY"?"verify your email":"reset your password"}</a></p>`
        }

        // next step is to send email with these email options 
        const mailResponse = await transporter.sendMail(mailOptions);
        console.log("MAIL Response: ",mailResponse);
        return mailResponse;


    } catch (error: any) {
        throw new Error(error.message)
    }
}


