import { NextResponse } from 'next/server';
import { globalStore } from '../route';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

// 1. GET Single Item (নির্দিষ্ট ID এর ডাটা দেখা)
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const item = globalStore.workingProcessList.find((item) => item.id === id);

  if (!item) {
    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  }

  return NextResponse.json(item, { status: 200 });
}

// 2. PUT / PATCH (Update - নির্দিষ্ট ID এর ডাটা আপডেট করা)
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const index = globalStore.workingProcessList.findIndex((item) => item.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    // ডাটা আপডেট করা হচ্ছে
    globalStore.workingProcessList[index] = {
      ...globalStore.workingProcessList[index],
      ...body,
    };

    return NextResponse.json(
      {
        message: 'Updated successfully',
        updatedItem: globalStore.workingProcessList[index],
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}

// 3. DELETE (Delete - নির্দিষ্ট ID এর ডাটা ডিলিট করা)
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const index = globalStore.workingProcessList.findIndex((item) => item.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    // তালিকা থেকে মুছে ফেলা হচ্ছে
    const deletedItem = globalStore.workingProcessList.splice(index, 1);

    return NextResponse.json(
      { message: 'Deleted successfully', deletedItem },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}