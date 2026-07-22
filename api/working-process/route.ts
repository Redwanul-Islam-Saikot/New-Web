import { NextResponse } from 'next/server';

// গ্লোবাল ডাটা স্টোর (ডেভেলপমেন্ট রি-লোডে ডাটা সেভ রাখার জন্য)
const globalStore = global as unknown as {
  workingProcessList: Array<{
    id: string;
    stepNumber: string;
    title: string;
    description: string;
    imageUrl: string;
  }>;
};

if (!globalStore.workingProcessList) {
  globalStore.workingProcessList = [
    {
      id: '1',
      stepNumber: '01',
      title: 'Get A Quotetation',
      description: "Answer a couple of questions, we'll provide accurate live quotes.",
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    },
    {
      id: '2',
      stepNumber: '02',
      title: 'Complete The Aplication',
      description: "Answer a couple of questions, we'll provide accurate live quotes.",
      imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=400&auto=format&fit=crop',
    },
    {
      id: '3',
      stepNumber: '03',
      title: 'Get your Insurance',
      description: "Answer a couple of questions, we'll provide accurate live quotes.",
      imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop',
    },
  ];
}

// এক্সপোর্ট করে দেওয়া হলো যেন [id]/route.ts থেকেও এক্সেস করা যায়
export { globalStore };

export const revalidate = 0;
export const dynamic = 'force-dynamic';

// 1. GET (সব ডাটা পাওয়ার জন্য)
export async function GET() {
  return NextResponse.json(globalStore.workingProcessList, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}

// 2. POST (নতুন আইটেম যোগ করার জন্য)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newItem = {
      id: Date.now().toString(),
      stepNumber: body.stepNumber || '01',
      title: body.title || 'New Step',
      description: body.description || '',
      imageUrl: body.imageUrl || '',
    };

    globalStore.workingProcessList.push(newItem);

    return NextResponse.json(
      { message: 'Item created successfully', data: newItem, list: globalStore.workingProcessList },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}