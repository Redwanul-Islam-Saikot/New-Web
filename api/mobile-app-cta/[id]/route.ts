import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import MobileAppCta from '@/lib/models/MobileAppCta';

// UPDATE Mobile App / CTA settings by ID
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    // Find and update the document by ID
    const updatedData = await MobileAppCta.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updatedData) {
      return NextResponse.json(
        { error: 'Mobile App CTA document not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Mobile App & CTA content updated successfully',
      data: updatedData,
    });
  } catch (error) {
    console.error('Error updating Mobile App CTA data:', error);
    return NextResponse.json(
      { error: 'Failed to update content' },
      { status: 500 }
    );
  }
}

// DELETE Mobile App / CTA record by ID
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const deletedData = await MobileAppCta.findByIdAndDelete(id);

    if (!deletedData) {
      return NextResponse.json(
        { error: 'Mobile App CTA document not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Mobile App & CTA content deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting Mobile App CTA data:', error);
    return NextResponse.json(
      { error: 'Failed to delete content' },
      { status: 500 }
    );
  }
}