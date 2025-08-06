/* eslint-disable no-undef */
import { NextResponse } from 'next/server'
import { join } from 'path'
import mime from 'mime'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'

function generateFilePath(root, dir, subDir, file, fileName) {
  const extension = mime.getExtension(file.type)
  return join(
    process.cwd(),
    `/${root}/${dir}/${subDir}`,
    `${fileName}.${extension}`
  )
}

async function ensureDirectoryExists(dirPath) {
  if (!existsSync(dirPath)) {
    await mkdir(dirPath, { recursive: true })
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('files')
    const dir = formData.get('dir')
    const subDir = formData.get('subDir')
    const fileName = formData.get('fileName') || 'image'

    if (!file || !dir || !subDir || !fileName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    const url = process.env.NEXT_PUBLIC_STATIC_URL
    const root = 'static'
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filePath = generateFilePath(root, dir, subDir, file, fileName)
    const dirPath = join(process.cwd(), `/${root}/${dir}`, subDir)

    await ensureDirectoryExists(dirPath)
    await writeFile(filePath, buffer)

    const urlParts = [
      url.endsWith('/') ? url.slice(0, -1) : url,
      dir,
      subDir,
      `${fileName}.${mime.getExtension(file.type)}`,
    ]

    const fileUrl = urlParts.filter(Boolean).join('/')

    return NextResponse.json(
      {
        success: true,
        path: fileUrl,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    )
  }
}
