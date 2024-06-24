import { User } from "@/lib/model";

export async function GET(req) {
  try {
    const users = await User.find().lean();
    return new Response(JSON.stringify({ success: true, data: users }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, message: 'Internal Server Error' }), { status: 500 });
  }
}

