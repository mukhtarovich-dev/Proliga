import { Tabs, Tab } from '@mui/material'
import Box from '@mui/material/Box'
import { styled } from '@mui/material'
import { getCorrectName } from 'utils/getCorrectName.util'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getTourName } from 'utils/tour.util'

export const GameTab = ({ item }) => {
  const { lang } = useSelector((state) => state.systemLanguage)
  const { t } = useTranslation()

  return (
    <div className="flex min-h-18 flex-col items-center justify-start gap-0.5 pt-2 sm:min-h-18 xl:pt-1">
      <p className="text-foreground text-start text-xs font-medium md:text-sm xl:text-base">
        {getCorrectName({ lang, uz: item?.name, ru: item?.name_ru })}
      </p>
      <p className="text-muted-foreground text-3xs md:text-2xs max-w-28 capitalize xl:text-xs">
        {getTourName(item.status, t)}
      </p>
    </div>
  )
}

export const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    slotProps={{
      indicator: {
        ...props.slotProps?.indicator,
        style: {
          ...props.slotProps?.indicator?.style,
          backgroundColor: 'var(--color-primary)',
        },
      },
    }}
  />
))({})

export const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(14),
    minWidth: 0,
    letterSpacing: 'var(--letter-spacing)',
    padding: 0,
    overflow: 'unset',
    fontFamily: 'var(--font-sans)',
    color: 'var(--color-foreground)',
    '&.Mui-selected': {
      backgroundColor: 'rgb(from var(--color-foreground) r g b / 0.1)',
      borderRadius: 'var(--radius-sm)',
    },
    '&.Mui-disabled': {
      opacity: 0.5,
    },
  })
)

export const CustomBox = ({ children }) => {
  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: 'var(--card)',
        color: 'var(--card-foreground)',
        height: 'auto',
        borderRadius: 'var(--radius)',
        minHeight: '64px',
      }}
    >
      {children}
    </Box>
  )
}
