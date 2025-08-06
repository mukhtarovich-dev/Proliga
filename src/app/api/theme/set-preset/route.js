import path from 'path'
import { NextResponse } from 'next/server'
import isEmpty from 'lodash/isEmpty'
import { writeFile, mkdir } from 'fs/promises'
import { generateThemeCssVariables } from '../utils'

export async function POST(request) {
  try {
    const body = await request.json()

    const lightThemeData = body.light_theme
    const darkThemeData = body.dark_theme
    const presetId = body.preset_id

    let combinedCss = ''

    if (!isEmpty(lightThemeData)) {
      combinedCss += generateThemeCssVariables(lightThemeData, 'light')
    }

    if (!isEmpty(darkThemeData)) {
      if (!isEmpty(combinedCss)) {
        combinedCss += '\n'
      }
      combinedCss += generateThemeCssVariables(darkThemeData, 'dark')
    }

    if (isEmpty(combinedCss)) {
      return NextResponse.json(
        { error: 'No theme data found in request to generate CSS' },
        { status: 400 }
      )
    }

    const themeCssPath = path.join(
      // eslint-disable-next-line no-undef
      process.cwd(),
      'static',
      'theme',
      `${presetId}.css`
    )
    const themeDir = path.dirname(themeCssPath)

    await mkdir(themeDir, { recursive: true })

    await writeFile(themeCssPath, combinedCss, { flag: 'w' })

    return new Response(combinedCss, {
      status: 200,
      headers: {
        'Content-Type': 'text/css',
      },
    })
  } catch (error) {
    console.error('Error processing theme transformation request:', error)
    return NextResponse.json(
      { error: 'Invalid JSON payload or an unexpected server error occurred.' },
      { status: error instanceof SyntaxError ? 400 : 500 }
    )
  }
}
