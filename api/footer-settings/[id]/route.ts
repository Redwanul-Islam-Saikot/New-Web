import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import FooterSettings from '@/lib/models/FooterSettings';

// PUT Method
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Promise type specific to Next.js 15
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const updated = await FooterSettings.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json(
        { error: 'Settings not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}

// DELETE Method
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Promise type specific to Next.js 15
) {
  try {
    await connectDB();
    const { id } = await params;

    const deleted = await FooterSettings.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { error: 'Settings not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Settings deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete settings' },
      { status: 500 }
    );
  }
}