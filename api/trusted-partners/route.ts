import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import TrustedPartner from '@/lib/models/TrustedPartner';

// 1. GET ALL PARTNERS
export async function GET() {
  try {
    await connectDB();
    const partners = await TrustedPartner.find({}).sort({ createdAt: -1 });

    const formatted = partners.map((p: any) => ({
      id: p._id.toString(),
      name: p.name,
      logoUrl: p.logoUrl,
      websiteUrl: p.websiteUrl || ''
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error('API GET Error:', error);
    return NextResponse.json([], { status: 500 });
  }
}

// 2. CREATE NEW PARTNER
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const newPartner = await TrustedPartner.create({
      name: body.name,
      logoUrl: body.logoUrl,
      websiteUrl: body.websiteUrl || '#'
    });

    return NextResponse.json({
      success: true,
      data: {
        id: newPartner._id.toString(),
        name: newPartner.name,
        logoUrl: newPartner.logoUrl,
        websiteUrl: newPartner.websiteUrl
      }
    });
  } catch (error) {
    console.error('API POST Error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}