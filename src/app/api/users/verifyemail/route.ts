import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel';
import { NextRequest, NextResponse} from 'next/server'
import { NextFontManifestPlugin } from '../../../../../node_modules/next/dist/build/webpack/plugins/next-font-manifest-plugin';


connect()

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {token} = reqBody;

        console.log(token);

        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})

        if(!user) {
            return NextResponse.json({
                message: "Invalid Token"
            }, {status: 400})
        }

        console.log(user);

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save()

        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        }, {status: 200})

        
    } catch (error:any) {
        console.log(error)
        return NextResponse.json({
            error:error.message
        }, {status: 500})
    }
}

