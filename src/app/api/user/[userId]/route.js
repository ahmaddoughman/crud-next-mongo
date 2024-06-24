import { User } from "@/lib/model";
import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
    const { userId } = params;

    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return new NextResponse(JSON.stringify({ success: false, message: 'User not found' }), { status: 404 });
        }
        return new NextResponse(JSON.stringify({ success: true, data: user }), { status: 200 });
    } catch (err) {
        console.log(err);
        return new NextResponse(JSON.stringify({ success: false, message: 'Internal Server Error' }), { status: 500 });
    }
}

export async function GET(req, { params }) {
    const { userId } = params;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return new NextResponse(JSON.stringify({ success: false, message: 'User not found' }), { status: 404 });
      }
      return new NextResponse(JSON.stringify({ success: true, data: user }), { status: 200 });
    } catch (err) {
      console.log(err);
      return new NextResponse(JSON.stringify({ success: false, message: 'Internal Server Error' }), { status: 500 });
    }
  }


export async function PUT(req, { params }) {
    const { userId } = params;
    const { username, email, password } = await req.json();

    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { username, email, password },
            { new: true }
        );
        if (!user) {
            return new NextResponse(JSON.stringify({ success: false, message: 'User not found' }), { status: 404 });
        }
        return new NextResponse(JSON.stringify({ success: true, data: user }), { status: 200 });
    } catch (err) {
        console.log(err);
        return new NextResponse(JSON.stringify({ success: false, message: 'Internal Server Error' }), { status: 500 });
    }
}