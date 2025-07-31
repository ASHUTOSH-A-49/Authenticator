import {connect} from "@/dbConfig/dbConfig"
import { NextRequest,NextResponse } from "next/server";

import User from "@/models/userModel";



connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;

        console.log("Received token:", token);

        const user = await User.findOne({ verifyToken: token });
        console.log("User found by token only:", user);

        const validUser = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
        });

        if (!validUser) {
            console.log("Token not valid or expired");
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }

        console.log("User to verify:", validUser);

        validUser.isVerified = true;
        validUser.verifyToken = undefined;
        validUser.verifyTokenExpiry = undefined;

        await validUser.save();

        return NextResponse.json({ message: "email verified", success: true }, { status: 200 });

    } catch (error: any) {
        console.error("Error verifying email:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
