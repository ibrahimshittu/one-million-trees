import { NextResponse } from 'next/server'
import { mockTrees } from '@/data/mockTrees'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const tree = mockTrees.find(t => t.id === params.id)

  if (!tree) {
    return NextResponse.json({
      success: false,
      error: 'Tree not found'
    }, { status: 404 })
  }

  return NextResponse.json({
    success: true,
    data: tree
  })
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const treeIndex = mockTrees.findIndex(t => t.id === params.id)

    if (treeIndex === -1) {
      return NextResponse.json({
        success: false,
        error: 'Tree not found'
      }, { status: 404 })
    }

    const updatedTree = {
      ...mockTrees[treeIndex],
      ...body,
      lastUpdated: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      data: updatedTree,
      message: 'Tree successfully updated'
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Invalid request body'
    }, { status: 400 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const treeIndex = mockTrees.findIndex(t => t.id === params.id)

  if (treeIndex === -1) {
    return NextResponse.json({
      success: false,
      error: 'Tree not found'
    }, { status: 404 })
  }

  return NextResponse.json({
    success: true,
    message: 'Tree successfully deleted'
  })
}