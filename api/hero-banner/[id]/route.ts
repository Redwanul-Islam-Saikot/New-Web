import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb'; 
import HeroBanner from '@/lib/models/HeroBanner';

// 🔄 PUT: নির্দিষ্ট ID-র ডাটা আপডেট করা
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    
    // Next.js এর সেফটি গাইডলাইন অনুযায়ী params-কে await করা হয়েছে
    const resolvedParams = await params;
    const id = resolvedParams.id; 
    
    const body = await req.json();
    const finalSubtitle = body.subtitle || body.tagline || ""; 
    const { title, description, imageUrl, ctaText, ctaLink, videoUrl } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: "ID parameter is missing" }, { status: 400 });
    }

    const updatedBanner = await HeroBanner.findByIdAndUpdate(
      id,
      { subtitle: finalSubtitle, title, description, imageUrl, ctaText, ctaLink, videoUrl },
      { new: true }
    );

    if (!updatedBanner) {
      return NextResponse.json({ success: false, message: "Banner not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Updated successfully!", data: updatedBanner });
  } catch (error: any) {
    console.error("PUT Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// 🗑️ DELETE: নির্দিষ্ট ID-র ডাটা মুছে ফেলা
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    
    const resolvedParams = await params;
    const id = resolvedParams.id;

    if (!id) {
      return NextResponse.json({ success: false, message: "ID parameter is missing" }, { status: 400 });
    }

    const deletedBanner = await HeroBanner.findByIdAndDelete(id);
    
    if (!deletedBanner) {
      return NextResponse.json({ success: false, message: "Banner not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Deleted successfully!" });
  } catch (error: any) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}