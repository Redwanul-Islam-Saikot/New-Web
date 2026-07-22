import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb'; // Your MongoDB connection file
import LatestHappening from '@/lib/models/LatestHappening';

export async function GET() {
  try {
    await connectDB();
    let data = await LatestHappening.findOne();

    if (!data) {
      data = await LatestHappening.create({
        tagline: 'NEWS & EVENTS',
        heading: 'STAY UPDATED WITH THE LATEST HAPPENINGS',
        description:
          'Stay updated with our latest news, events, and initiatives at Purabi General Insurance. Join us in protecting your future!',
        items: [],
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching latest happenings:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    let data = await LatestHappening.findOne();

    if (data) {
      data.tagline = body.tagline;
      data.heading = body.heading;
      data.description = body.description;
      data.items = body.items || [];
      await data.save();
    } else {
      data = await LatestHappening.create(body);
    }

    return NextResponse.json({ message: 'Saved successfully', data });
  } catch (error) {
    console.error('Error updating latest happenings:', error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}