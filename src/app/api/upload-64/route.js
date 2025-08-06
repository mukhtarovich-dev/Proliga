/* eslint-disable no-undef */
import { NextResponse } from 'next/server'
import { join } from 'path'
import mime from 'mime'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'

function validateImageUpload(data) {
  return (
    data.base64Data &&
    data.mimeType &&
    data.dir &&
    data.subDir &&
    data.base64Data.startsWith('data:image/')
  )
}

async function ensureDirectoryExists(dirPath) {
  if (!existsSync(dirPath)) {
    await mkdir(dirPath, { recursive: true })
  }
}

function decodeBase64Image(base64Data) {
  const base64Image = base64Data.split(';base64,').pop()
  if (!base64Image) {
    throw new Error('Invalid base64 image data')
  }
  return Buffer.from(base64Image, 'base64')
}

function generateFilePath(root, dir, subDir, mimeType, fileName) {
  const extension = mime.getExtension(mimeType)
  return join(
    process.cwd(),
    `/${root}/${dir}/${subDir}`,
    `${fileName}.${extension}`
  )
}

async function saveImage(fileDetails) {
  const root = 'static'
  const url = process.env.NEXT_PUBLIC_STATIC_URL
  const { base64Data, mimeType, dir, subDir, fileName } = fileDetails

  const filePath = generateFilePath(root, dir, subDir, mimeType, fileName)
  const dirPath = join(process.cwd(), `/${root}/${dir}`, subDir)

  await ensureDirectoryExists(dirPath)
  const imageBuffer = decodeBase64Image(base64Data)
  await writeFile(filePath, imageBuffer)

  const urlParts = [
    url.endsWith('/') ? url.slice(0, -1) : url,
    dir,
    subDir,
    `${fileName}.${mime.getExtension(mimeType)}`,
  ]

  const fileUrl = urlParts.filter(Boolean).join('/')

  return fileUrl
}

export async function POST(request) {
  try {
    const data = await request.json()

    if (!validateImageUpload(data)) {
      return NextResponse.json(
        { error: 'Missing required fields or invalid image data' },
        { status: 400 }
      )
    }

    const filePath = await saveImage({
      base64Data: data.base64Data,
      mimeType: data.mimeType,
      dir: data.dir,
      subDir: data.subDir,
      fileName: data.fileName || 'image',
    })

    return NextResponse.json(
      {
        success: true,
        path: filePath,
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
