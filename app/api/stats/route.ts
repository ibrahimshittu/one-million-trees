import { NextResponse } from 'next/server'
import { treeStats } from '@/data/mockTrees'

export async function GET() {
  return NextResponse.json({
    success: true,
    data: treeStats
  })
}