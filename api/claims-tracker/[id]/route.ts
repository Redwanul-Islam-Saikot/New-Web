import { NextResponse } from 'next/server';
import { getClaimById, updateClaim, deleteClaim } from '../data';

export const dynamic = 'force-dynamic';

// 📖 GET SINGLE
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const item = getClaimById(id);

  if (!item) {
    return NextResponse.json({ success: false, error: 'Item not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: item }, { status: 200 });
}

// ✏️ PATCH (UPDATE)
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updatedItem = updateClaim(id, body);

    if (!updatedItem) {
      return NextResponse.json({ success: false, error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Updated successfully!',
      data: updatedItem
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update item' }, { status: 500 });
  }
}

// 🗑️ DELETE
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    deleteClaim(id);

    return NextResponse.json({
      success: true,
      message: 'Deleted successfully!'
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete item' }, { status: 500 });
  }
}