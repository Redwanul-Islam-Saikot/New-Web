import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import FooterSettings from '@/lib/models/FooterSettings';

export async function GET() {
  try {
    await connectDB();
    const settings = await FooterSettings.findOne();
    return NextResponse.json(settings || null);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const settings = await FooterSettings.create(body);
    return NextResponse.json({ message: 'Settings created', data: settings }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create settings' }, { status: 500 });
  }
}