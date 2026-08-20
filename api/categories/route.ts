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

const defaultData = {
  sectionTitle: "CATEGORIES OF INSURANCE",
  sectionDescription: "At SIPLC, we exceed customer expectations by being available both physically and virtually on their preferred channels.",
  cards: []
};

function getStoredData() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      const dirPath = path.dirname(dataFilePath);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      fs.writeFileSync(dataFilePath, JSON.stringify(defaultData, null, 2), 'utf-8');
      return defaultData;
    }
    const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(fileContent || JSON.stringify(defaultData));
  } catch (error) {
    return defaultData;
  }
}

function saveStoredData(data: any) {
  try {
    const dirPath = path.dirname(dataFilePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error("Failed to write categories file:", error);
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// 📖 [GET]
export async function GET() {
  const data = getStoredData();
  return NextResponse.json(data, {
    status: 200,
    headers: corsHeaders,
  });
}

// 💾 [POST]
export async function POST(req: Request) {
  try {
    const body = await req.json();
    let currentData = getStoredData();

    if (body.cards && Array.isArray(body.cards)) {
      currentData = {
        sectionTitle: body.sectionTitle ?? currentData.sectionTitle,
        sectionDescription: body.sectionDescription ?? currentData.sectionDescription,
        cards: body.cards
      };
    } else if (body.title || body.description || body.iconUrl) {
      if (!Array.isArray(currentData.cards)) {
        currentData.cards = [];
      }
      
      const newCard = {
        id: body.id || Date.now().toString(),
        title: body.title || "",
        description: body.description || "",
        iconUrl: body.iconUrl || "",
        redirectUrl: body.redirectUrl || "#"
      };

      currentData.cards.push(newCard);
    }

    saveStoredData(currentData);

    revalidatePath('/', 'layout');
    revalidatePath('/api/categories');

    return NextResponse.json({ 
      success: true, 
      message: 'Categories updated successfully!', 
      data: currentData 
    }, { 
      status: 200, 
      headers: corsHeaders 
    });

  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to save category data' 
    }, { 
      status: 500, 
      headers: corsHeaders 
    });
  }
}