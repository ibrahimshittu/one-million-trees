import { NextResponse } from 'next/server'
import { mockTrees } from '@/data/mockTrees'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const state = searchParams.get('state')
  const status = searchParams.get('status')
  const limit = searchParams.get('limit')

  let filteredTrees = [...mockTrees]

  if (state) {
    filteredTrees = filteredTrees.filter(
      tree => tree.location.state.toLowerCase() === state.toLowerCase()
    )
  }

  if (status) {
    filteredTrees = filteredTrees.filter(
      tree => tree.status === status
    )
  }

  if (limit) {
    filteredTrees = filteredTrees.slice(0, parseInt(limit))
  }

  return NextResponse.json({
    success: true,
    data: filteredTrees,
    total: filteredTrees.length
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const newTree = {
      id: Date.now().toString(),
      ...body,
      plantedDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      data: newTree,
      message: 'Tree successfully added'
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Invalid request body'
    }, { status: 400 })
  }
}