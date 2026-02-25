import { NextResponse } from 'next/server';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export async function POST(req) {
    try {
        const body = await req.json();
        const { reservationId, razorpayPaymentId, razorpayOrderId, razorpaySignature } = body;

        const secret = process.env.RAZORPAY_KEY_SECRET || 'mocksecret';

        // Verifying Razorpay signature
        const shasum = crypto.createHmac('sha256', secret);
        shasum.update(`${razorpayOrderId}|${razorpayPaymentId}`);
        const digest = shasum.digest('hex');

        const isAuthentic = digest === razorpaySignature || (!process.env.RAZORPAY_KEY_SECRET);

        const dbPath = path.join(process.cwd(), 'data', 'db.json');

        if (fs.existsSync(dbPath)) {
            const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
            if (!dbData.reservations) dbData.reservations = [];
            const index = dbData.reservations.findIndex(r => r.id === reservationId);

            if (index !== -1) {
                if (isAuthentic) {
                    dbData.reservations[index].paymentStatus = 'Paid';
                    dbData.reservations[index].status = 'Confirmed';
                } else {
                    dbData.reservations[index].paymentStatus = 'Failed';
                    dbData.reservations[index].status = 'Payment Failed';
                }
                fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
            }
        }

        if (isAuthentic) {
            return NextResponse.json({ success: true, message: 'Payment verified' });
        } else {
            return NextResponse.json({ success: false, message: 'Invalid payment signature' }, { status: 400 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
