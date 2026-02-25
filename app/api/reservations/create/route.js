import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

export async function POST(req) {
    try {
        const body = await req.json();
        const { formData, amount } = body;

        if (!formData || !amount) {
            return NextResponse.json({ success: false, message: 'Invalid format' }, { status: 400 });
        }

        const reservationId = uuidv4();

        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_mockkey',
            key_secret: process.env.RAZORPAY_KEY_SECRET || 'mocksecret',
        });

        const options = {
            amount: parseInt(amount) * 100, // Amount in paise
            currency: "INR",
            receipt: reservationId
        };
        const razorpayOrder = await instance.orders.create(options);

        // Optionally, could store to db.json here (skipping for simplicity now, or just adding to reservations array if exists)
        const dbPath = path.join(process.cwd(), 'data', 'db.json');
        let dbData = { orders: [], orderItems: [], reservations: [] };

        try {
            if (fs.existsSync(dbPath)) {
                dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
                if (!dbData.reservations) dbData.reservations = [];
            }
        } catch (e) {
            console.error('Failed to parse DB:', e);
        }

        const newReservation = {
            id: reservationId,
            ...formData,
            amount: parseInt(amount),
            paymentStatus: 'Pending',
            status: 'Pending',
            timestamp: new Date().toISOString()
        };

        dbData.reservations.push(newReservation);
        fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));


        return NextResponse.json({
            success: true,
            reservationId,
            razorpayOrder,
            message: 'Reservation initiated successfully'
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Server err' }, { status: 500 });
    }
}
