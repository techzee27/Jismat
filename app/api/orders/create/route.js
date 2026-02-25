import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Razorpay from 'razorpay';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
    try {
        const body = await req.json();
        const { userDetails, items, subtotal, gst, deliveryFee, grandTotal, paymentMethod } = body;

        // Basic validation
        if (!userDetails || !items || items.length === 0 || !grandTotal) {
            return NextResponse.json({ success: false, message: 'Invalid data' }, { status: 400 });
        }

        // Mock DB connection
        const dbPath = path.join(process.cwd(), 'data', 'db.json');
        const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

        const orderId = uuidv4();
        const status = paymentMethod === 'cod' ? 'Pending' : 'Pending Payment';
        const pStatus = paymentMethod === 'cod' ? 'COD - Pending' : 'Pending';

        const newOrder = {
            id: orderId,
            userDetails,
            totalAmount: grandTotal,
            subtotal,
            gst,
            deliveryFee,
            paymentMethod,
            paymentStatus: pStatus,
            orderStatus: status,
            timestamp: new Date().toISOString()
        };

        const newOrderItems = items.map(item => ({
            id: uuidv4(),
            orderId: orderId,
            foodId: item.id,
            quantity: item.quantity,
            price: item.price
        }));

        dbData.orders.push(newOrder);
        dbData.orderItems.push(...newOrderItems);
        fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));

        let razorpayOrder = null;

        if (paymentMethod === 'online') {
            // Secret key logic
            const instance = new Razorpay({
                key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_mockkey',
                key_secret: process.env.RAZORPAY_KEY_SECRET || 'mocksecret',
            });

            const options = {
                amount: grandTotal * 100, // amount in the smallest currency unit
                currency: "INR",
                receipt: orderId
            };
            razorpayOrder = await instance.orders.create(options);
        }

        return NextResponse.json({
            success: true,
            orderId,
            razorpayOrder,
            message: 'Order created successfully'
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
