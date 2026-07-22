import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import MobileAppCta from '@/lib/models/MobileAppCta';

export async function GET() {
  try {
    await connectDB();
    // ডাটা না থাকলে null রিটার্ন করবে, অটো ক্রিয়েট করবে না
    const data = await MobileAppCta.findOne();
    return NextResponse.json(data || null);
  } catch (error) {
    console.error('Error fetching Mobile App CTA data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    let data = await MobileAppCta.findOne();

    if (data) {
      Object.assign(data, body);
      await data.save();
    } else {
      data = await MobileAppCta.create(body);
    }

    return NextResponse.json({ message: 'Data saved successfully', data });
  } catch (error) {
    console.error('Error saving Mobile App CTA data:', error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}