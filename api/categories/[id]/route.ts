import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const dataFilePath = path.join(process.cwd(), 'data', 'categories.json');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
};

function getStoredData() {
  try {
    if (fs.existsSync(dataFilePath)) {
      const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
      return JSON.parse(fileContent);
    }
  } catch (error) {
    console.error(error);
  }
  return { sectionTitle: "", sectionDescription: "", cards: [] };
}

function saveStoredData(data: any) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error("Failed to write data file:", error);
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// ✏️ [PATCH] Update Single Card
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    const currentData = getStoredData();

    const index = currentData.cards.findIndex((c: any) => String(c.id) === String(id));

    if (index !== -1) {
      currentData.cards[index] = { ...currentData.cards[index], ...body };
      saveStoredData(currentData);

      revalidatePath('/', 'layout');
      revalidatePath('/api/categories');

      return NextResponse.json({
        success: true,
        message: 'Card updated successfully!',
        data: currentData
      }, { status: 200, headers: corsHeaders });
    }

    return NextResponse.json({ success: false, error: 'Card not found' }, { status: 404, headers: corsHeaders });

  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update card' }, { status: 500, headers: corsHeaders });
  }
}

// 🗑️ [DELETE] Delete Single Card
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const currentData = getStoredData();

    currentData.cards = currentData.cards.filter((c: any) => String(c.id) !== String(id));
    saveStoredData(currentData);

    revalidatePath('/', 'layout');
    revalidatePath('/api/categories');

    return NextResponse.json({
      success: true,
      message: 'Card deleted successfully!',
      data: currentData
    }, { status: 200, headers: corsHeaders });

  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete card' }, { status: 500, headers: corsHeaders });
  }
}