import ConfirmationContent from './ConfirmationContent';
import fs from 'fs';
import path from 'path';

export async function generateMetadata({ params }) {
    const { orderId } = await params;
    return {
        title: `Order ${orderId} | GISMAT MANDI`,
        description: 'Your order confirmation',
    };
}

export default async function Page({ params }) {
    const { orderId } = await params;

    // Server-side fetching of order details
    const dbPath = path.join(process.cwd(), 'src', 'data', 'db.json');
    let orderDetails = null;
    let orderItems = [];

    try {
        if (fs.existsSync(dbPath)) {
            const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
            orderDetails = dbData.orders.find(o => o.id === orderId);
            orderItems = dbData.orderItems.filter(i => i.orderId === orderId);
        }
    } catch (e) {
        console.error('Failed to read DB:', e);
    }

    return <ConfirmationContent orderId={orderId} orderDetails={orderDetails} orderItems={orderItems} />;
}
