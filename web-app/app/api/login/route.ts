import { NextResponse } from 'next/server';
import { validateLogin } from '@/middleware/midw'; // Adjust the path if necessary

export async function POST(req: Request) {
    console.log('API endpoint hit:', req.method);

    try {
        const { username, password } = await req.json(); // Parse the JSON body

        if (!username || !password) {
            console.log('Missing username or password');
            return NextResponse.json({ success: false, message: 'Username and password are required' }, { status: 400 });
        }

        console.log('Validating login for:', username);
        const result = await validateLogin(username, password);
        console.log('Validation result:', result);

        if (result.success) {
            return NextResponse.json({ success: true, user: result.user }, { status: 200 });
        } else {
            return NextResponse.json({ success: false, message: result.message }, { status: 401 });
        }
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}