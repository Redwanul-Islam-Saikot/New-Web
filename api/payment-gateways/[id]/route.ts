import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import PaymentGateway from '@/lib/models/PaymentGateway'; // Corrected import path

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Type updated for Next.js 15
) {
  try {
    await connectDB();

    // Await params here (Next.js 15 rule)
    const resolvedParams = await params;
    const id = resolvedParams.id;

    const deletedGateway = await PaymentGateway.findByIdAndDelete(id);

    if (!deletedGateway) {
      return NextResponse.json(
        { error: 'Gateway not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Gateway deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete gateway' },
      { status: 500 }
    );
  }
}