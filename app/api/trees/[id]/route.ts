import { NextResponse } from "next/server";
import { mockTrees } from "@/data/mockTrees";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const tree = mockTrees.find((t) => t.id === id);

  if (!tree) {
    return NextResponse.json(
      {
        success: false,
        error: "Tree not found",
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: tree,
  });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const treeIndex = mockTrees.findIndex((t) => t.id === id);

    if (treeIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: "Tree not found",
        },
        { status: 404 }
      );
    }

    const updatedTree = {
      ...mockTrees[treeIndex],
      ...body,
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: updatedTree,
      message: "Tree successfully updated",
    });
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

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const treeIndex = mockTrees.findIndex((t) => t.id === id);

  if (treeIndex === -1) {
    return NextResponse.json(
      {
        success: false,
        error: "Tree not found",
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Tree successfully deleted",
  });
}
