import {
  DEFAULT_DARK_THEME,
  DEFAULT_LIGHT_THEME,
} from 'utils/default-theme.util'

const ThemePreview = ({ theme }) => {
  const commonPreviewSize = 'h-8 w-8' // Slightly smaller size
  const sidebarPreviewSize = 'h-8 w-3' // Proportionally smaller sidebar
  const commonPreviewDivStyle = `relative flex flex-col items-center justify-start overflow-hidden p-0.5`

  const borderRadiusSetting = theme.light_theme?.global?.radius
  const borderRadiusValue =
    borderRadiusSetting !== undefined
      ? `${parseFloat(borderRadiusSetting) / 2}rem`
      : '0.125rem'

  // Helper to get color with fallback
  const getColor = (themeColors, key, fallbackColor) => {
    return themeColors?.[key] || fallbackColor
  }

  const ForegroundDot = ({ color }) => (
    <div
      className="absolute top-1/2 left-1/2 h-0.5 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{ backgroundColor: color }}
    />
  )

  const ColorSwatch = ({ bgColor, fgColor, label, small }) => (
    <div
      title={label}
      className={`relative ${small ? 'h-0.5 w-full' : 'h-1 w-full'} rounded-xxs shrink-0`}
      style={{ backgroundColor: bgColor }}
    >
      {fgColor && <ForegroundDot color={fgColor} />}
    </div>
  )

  const renderSidebarItems = (themeConfig, type) => {
    const currentTheme =
      type === 'dark' ? themeConfig.dark_theme : themeConfig.light_theme
    const defaultColors =
      type === 'dark' ? DEFAULT_DARK_THEME.colors : DEFAULT_LIGHT_THEME.colors
    const colors = currentTheme?.colors

    return (
      <div
        className="flex h-full w-full flex-col items-center justify-start gap-0.25 p-0.25"
        style={{
          backgroundColor: getColor(colors, 'sidebar', defaultColors.sidebar),
          borderColor: getColor(
            colors,
            'sidebar-border',
            defaultColors['sidebar-border']
          ),
          borderWidth: '1px',
          borderStyle: 'solid',
          boxShadow: `0 0 0 0.5px ${getColor(colors, 'sidebar-ring', defaultColors['sidebar-ring'])}`,
        }}
      >
        {/* Active link */}
        <div
          className="rounded-xxs w-full"
          style={{
            backgroundColor: getColor(
              colors,
              'sidebar-primary',
              defaultColors['sidebar-primary']
            ),
            height: '2px',
          }}
        >
          <div
            style={{
              backgroundColor: getColor(
                colors,
                'sidebar-primary-foreground',
                defaultColors['sidebar-primary-foreground']
              ),
              width: '50%',
              height: '100%',
            }}
          />
        </div>

        {/* Regular link */}
        <div
          className="rounded-xxs my-0.25 w-full"
          style={{
            backgroundColor: 'transparent',
            height: '2px',
            border: `0.5px solid ${getColor(
              colors,
              'sidebar-foreground',
              defaultColors['sidebar-foreground']
            )}`,
          }}
        />

        {/* Hovered link */}
        <div
          className="rounded-xxs w-full"
          style={{
            backgroundColor: getColor(
              colors,
              'sidebar-accent',
              defaultColors['sidebar-accent']
            ),
            height: '2px',
          }}
        >
          <div
            style={{
              backgroundColor: getColor(
                colors,
                'sidebar-accent-foreground',
                defaultColors['sidebar-accent-foreground']
              ),
              width: '50%',
              height: '100%',
            }}
          />
        </div>
      </div>
    )
  }

  const renderWebsitePreviewElements = (themeConfig, type) => {
    const currentTheme =
      type === 'dark' ? themeConfig.dark_theme : themeConfig.light_theme
    const defaultColors =
      type === 'dark' ? DEFAULT_DARK_THEME.colors : DEFAULT_LIGHT_THEME.colors
    const colors = currentTheme?.colors

    return (
      <div className="flex h-full w-full flex-col items-start justify-start gap-0.25 p-0.25">
        {/* Header */}
        <ColorSwatch
          bgColor={getColor(colors, 'primary', defaultColors.primary)}
          fgColor={getColor(
            colors,
            'primary_foreground',
            defaultColors['primary_foreground']
          )}
          label="Primary"
        />

        {/* Accent Element */}
        <div
          className="rounded-xxs my-0.25 h-0.5 w-2/5 shrink-0"
          style={{
            backgroundColor: getColor(colors, 'accent', defaultColors.accent),
          }}
          title="Accent"
        >
          <div
            style={{
              width: '50%',
              height: '100%',
              backgroundColor: getColor(
                colors,
                'accent_foreground',
                defaultColors['accent_foreground']
              ),
            }}
            className="rounded-l-xxs"
          ></div>
        </div>

        {/* Text Lines on Background */}
        <div
          className="rounded-xxs flex w-full shrink-0 flex-col items-start gap-0.25 px-0.25 py-0.25"
          style={{
            backgroundColor: getColor(
              colors,
              'background',
              defaultColors.background
            ),
          }}
        >
          <div
            className="h-0.5 w-4/5 rounded-full"
            style={{
              backgroundColor: getColor(
                colors,
                'foreground',
                defaultColors.foreground
              ),
            }}
            title="Foreground"
          ></div>
          <div
            className="h-0.5 w-3/5 rounded-full"
            style={{
              backgroundColor: getColor(
                colors,
                'foreground',
                defaultColors.foreground
              ),
            }}
            title="Foreground (variant)"
          ></div>
        </div>

        {/* Card with Content */}
        <div
          className="rounded-xxs my-0.25 flex h-1.5 w-full items-center justify-center p-0.25"
          style={{
            backgroundColor: getColor(colors, 'card', defaultColors.card),
          }}
          title="Card"
        >
          <div
            className="h-0.5 w-0.5 rounded-full"
            style={{
              backgroundColor: getColor(
                colors,
                'card_foreground',
                defaultColors['card_foreground']
              ),
            }}
            title="Card Foreground"
          ></div>
        </div>

        {/* Popover, Input, Ring */}
        <div className="flex w-full items-center gap-0.25">
          <div
            className="rounded-xxs relative h-1 w-1"
            style={{
              backgroundColor: getColor(
                colors,
                'popover',
                defaultColors.popover
              ),
            }}
            title="Popover"
          >
            <ForegroundDot
              color={getColor(
                colors,
                'popover_foreground',
                defaultColors['popover_foreground']
              )}
            />
          </div>
          <div
            className="rounded-xxs h-1 flex-grow border"
            style={{
              backgroundColor: getColor(colors, 'input', defaultColors.input),
              borderColor: getColor(colors, 'border', defaultColors.border),
              boxShadow: `0 0 0 0.5px ${getColor(colors, 'ring', defaultColors.ring)}`,
            }}
            title="Input, Border, Ring"
          ></div>
        </div>

        {/* Chart Colors */}
        <div className="flex w-full gap-0.25">
          {['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5'].map(
            (chart) => (
              <div
                key={chart}
                className="rounded-xxs h-0.5 flex-1"
                style={{
                  backgroundColor: getColor(
                    colors,
                    chart,
                    defaultColors[chart]
                  ),
                }}
                title={`${chart.charAt(0).toUpperCase()}${chart.slice(1).replace('-', ' ')}`}
              ></div>
            )
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1.5">
      {/* Dark Theme Preview Set */}
      <div
        className="flex items-start gap-0.5"
        title={`Dark Theme: ${theme.name}`}
      >
        <div
          className={`${commonPreviewSize} ${commonPreviewDivStyle}`}
          style={{
            backgroundColor: getColor(
              theme.dark_theme?.colors,
              'card',
              DEFAULT_DARK_THEME.colors.card
            ),
            fontFamily: theme.dark_theme?.font || DEFAULT_DARK_THEME.font,
            borderRadius: borderRadiusValue,
            borderColor: getColor(
              theme.dark_theme?.colors,
              'border',
              DEFAULT_DARK_THEME.colors.border
            ),
            borderWidth: '0.5px',
          }}
        >
          {renderWebsitePreviewElements(theme, 'dark')}
        </div>
        <div
          className={`${sidebarPreviewSize} ${commonPreviewDivStyle}`}
          style={{
            borderRadius: borderRadiusValue,
          }}
        >
          {renderSidebarItems(theme, 'dark')}
        </div>
      </div>

      {/* Light Theme Preview Set */}
      <div
        className="flex items-start gap-0.5"
        title={`Light Theme: ${theme.name}`}
      >
        <div
          className={`${commonPreviewSize} ${commonPreviewDivStyle}`}
          style={{
            backgroundColor: getColor(
              theme.light_theme?.colors,
              'card',
              DEFAULT_LIGHT_THEME.colors.card
            ),
            fontFamily: theme.light_theme?.font || DEFAULT_LIGHT_THEME.font,
            borderRadius: borderRadiusValue,
            borderColor: getColor(
              theme.light_theme?.colors,
              'border',
              DEFAULT_LIGHT_THEME.colors.border
            ),
            borderWidth: '0.5px',
          }}
        >
          {renderWebsitePreviewElements(theme, 'light')}
        </div>
        <div
          className={`${sidebarPreviewSize} ${commonPreviewDivStyle}`}
          style={{
            borderRadius: borderRadiusValue,
          }}
        >
          {renderSidebarItems(theme, 'light')}
        </div>
      </div>
    </div>
  )
}

export default ThemePreview
