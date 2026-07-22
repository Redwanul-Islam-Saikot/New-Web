import { NextResponse } from 'next/server';
import { getAllClaims, addClaim } from './data';

export const dynamic = 'force-dynamic';

// Dynamic CORS Headers - Localhost ছাড়া সব ডোমেইনের জন্য উন্মুক্ত
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
  const claims = getAllClaims();
  return NextResponse.json(
    { success: true, count: claims.length, data: claims },
    { status: 200, headers: corsHeaders }
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newClaim = addClaim({
      subTitle: body.subTitle || body.subtitle || '',
      mainTitle: body.mainTitle || body.title || '',
      description: body.description || '',
      buttonText: body.buttonText || '',
      buttonLink: body.buttonLink || body.buttonUrl || '#',
      emailText: body.emailText || body.email || '',
      imageUrl: body.imageUrl || '',
    });

    return NextResponse.json(
      { success: true, message: 'Created successfully!', data: newClaim },
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create item' },
      { status: 500, headers: corsHeaders }
    );
  }
}