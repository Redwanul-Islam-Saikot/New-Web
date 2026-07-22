import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb'; 
import HeroBanner from '@/lib/models/HeroBanner';

export const dynamic = "force-dynamic";

// 🔄 GET: সব হিরো ব্যানার ডাটা রিড করা
export async function GET() {
  try {
    await connectDB();
    const banners = await HeroBanner.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: banners });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// ➕ POST: নতুন হিরো ব্যানার তৈরি করা
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    
    const finalSubtitle = body.subtitle || body.tagline || ""; 
    const { title, description, imageUrl, ctaText, ctaLink, videoUrl } = body;

    if (!title || !description || !finalSubtitle) {
      return NextResponse.json({ 
        success: false, 
        message: "Validation Error: Title, Description, and Slider Tagline are required." 
      }, { status: 400 });
    }

    const newBanner = await HeroBanner.create({
      subtitle: finalSubtitle,
      title, 
      description, 
      imageUrl, 
      ctaText, 
      ctaLink, 
      videoUrl
    });
    
    return NextResponse.json({ success: true, message: "Created successfully!", data: newBanner }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}