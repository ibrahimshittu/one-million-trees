import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, tierId, donorName, donorEmail, message } = body;

    if (!amount || amount < 5000) {
      return NextResponse.json(
        {
          success: false,
          error: "Minimum donation amount is ₦5,000",
        },
        { status: 400 }
      );
    }

    const treesPlanted = Math.floor(amount / 5000);

    const donation = {
      id: Date.now().toString(),
      amount,
      tierId,
      donorName,
      donorEmail,
      message,
      treesPlanted,
      timestamp: new Date().toISOString(),
      paymentStatus: "pending",
      paymentReference: `DNT-${Date.now()}`,
    };

    return NextResponse.json(
      {
        success: true,
        data: donation,
        message: `Thank you for your donation! You will plant ${treesPlanted} tree${
          treesPlanted > 1 ? "s" : ""
        }.`,
        paymentUrl: `https://checkout.paystack.com/ref/${donation.paymentReference}`,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid request body",
      },
      { status: 400 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") || "10";

  const mockDonations = [
    {
      id: "1",
      donorName: "Anonymous",
      amount: 50000,
      treesPlanted: 10,
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: "2",
      donorName: "John Doe",
      amount: 25000,
      treesPlanted: 5,
      timestamp: new Date(Date.now() - 7200000).toISOString(),
    },
    {
      id: "3",
      donorName: "Jane Smith",
      amount: 100000,
      treesPlanted: 20,
      timestamp: new Date(Date.now() - 10800000).toISOString(),
    },
  ];

  return NextResponse.json({
    success: true,
    data: mockDonations.slice(0, parseInt(limit)),
    total: mockDonations.length,
  });
}
