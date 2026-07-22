import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import PaymentGateway from '@/lib/models/PaymentGateway';

export async function GET() {
  try {
    await connectDB();
    const gateways = await PaymentGateway.find().sort({ createdAt: -1 });
    return NextResponse.json(gateways);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch gateways' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const gateway = await PaymentGateway.create(body);
    return NextResponse.json({ message: 'Gateway created', data: gateway }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create gateway' }, { status: 500 });
  }
}