import {connect} from '@/dbConfig/dbConfig'
import { getDataFromToken } from '@/helpers/getDataFromToken'
import User from '@/models/userModel'
import { NextRequest, NextResponse} from 'next/server'


connect()

export async function POST(request:NextRequest) {
    try {
        // extract data from token
        const userId = await getDataFromToken(request)

        const user = await User.findOne({_id : userId}).select("-password")

        return NextResponse.json({
            message: "User found",
            data: user
        })
    } catch (error) {
        
    }
}