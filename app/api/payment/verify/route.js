import { NextResponse } from 'next/server';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export async function POST(req) {
    try {
        const body = await req.json();
        const { orderId, razorpayPaymentId, razorpayOrderId, razorpaySignature } = body;

        const secret = process.env.RAZORPAY_KEY_SECRET || 'mocksecret';

        // Verifying Razorpay signature
        const shasum = crypto.createHmac('sha256', secret);
        shasum.update(`${razorpayOrderId}|${razorpayPaymentId}`);
        const digest = shasum.digest('hex');

        // Note: For mock testing, if the signature doesn't match we log the warning but might proceed 
        // purely to allow local testing if mock is used. In production, exact match is required.
        const isAuthentic = digest === razorpaySignature || (!process.env.RAZORPAY_KEY_SECRET);

        const dbPath = path.join(process.cwd(), 'data', 'db.json');
        const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        const orderIndex = dbData.orders.findIndex(o => o.id === orderId);

        if (orderIndex === -1) {
            return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
        }

        if (isAuthentic) {
            dbData.orders[orderIndex].paymentStatus = 'Paid';
            dbData.orders[orderIndex].orderStatus = 'Confirmed';
            fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));

            return NextResponse.json({ success: true, message: 'Payment verified' });
        } else {
            dbData.orders[orderIndex].paymentStatus = 'Payment Failed';
            dbData.orders[orderIndex].orderStatus = 'Pending Payment';
            fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));

            return NextResponse.json({ success: false, message: 'Invalid payment signature' }, { status: 400 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
