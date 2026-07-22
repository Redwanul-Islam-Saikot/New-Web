import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import LatestHappening from '@/lib/models/LatestHappening';

// UPDATE a single news item by ID
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json(); // Updated item data

    const document = await LatestHappening.findOne();
    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    // Find index of the item
    const itemIndex = document.items.findIndex(
      (item: { id: string }) => item.id === id
    );

    if (itemIndex === -1) {
      return NextResponse.json({ error: 'News item not found' }, { status: 404 });
    }

    // Update the specific item
    document.items[itemIndex] = {
      ...document.items[itemIndex].toObject(),
      ...body,
      id, // Preserve original ID
    };

    await document.save();

    return NextResponse.json({
      message: 'News item updated successfully',
      data: document.items[itemIndex],
    });
  } catch (error) {
    console.error('Error updating news item:', error);
    return NextResponse.json(
      { error: 'Failed to update news item' },
      { status: 500 }
    );
  }
}

// DELETE a single news item by ID
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const document = await LatestHappening.findOne();
    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    // Filter out the item with the given ID
    const initialLength = document.items.length;
    document.items = document.items.filter(
      (item: { id: string }) => item.id !== id
    );

    if (document.items.length === initialLength) {
      return NextResponse.json({ error: 'News item not found' }, { status: 404 });
    }

    await document.save();

    return NextResponse.json({
      message: 'News item deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting news item:', error);
    return NextResponse.json(
      { error: 'Failed to delete news item' },
      { status: 500 }
    );
  }
}