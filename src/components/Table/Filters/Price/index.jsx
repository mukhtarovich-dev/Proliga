'use client'

import React from 'react'
import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'components/ui/popover'
import { Separator } from 'components/ui/separator'
import { Slider } from 'components/ui/slider'
import { XCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const PriceFilter = ({ column, columnFilterValue, title = 'Narx' }) => {
  const { t } = useTranslation()
  const id = React.useId()

  const getValidRange = React.useCallback(
    (value, fallback) =>
      Array.isArray(value) &&
      value.length === 2 &&
      value.every((v) => typeof v === 'number')
        ? value
        : fallback,
    []
  )

  const defaultRange = column?.columnDef?.meta?.range
  const unit = column?.columnDef?.meta?.unit

  const { min, max, step } = React.useMemo(() => {
    let minValue = 5,
      maxValue = 16
    if (getValidRange(defaultRange)) {
      ;[minValue, maxValue] = defaultRange
    } else {
      const values = column?.getFacetedMinMaxValues?.()
      if (getValidRange(values)) {
        ;[minValue, maxValue] = values
      }
    }
    const rangeSize = maxValue - minValue
    return {
      min: minValue,
      max: maxValue,
      step:
        rangeSize <= 20
          ? 1
          : rangeSize <= 100
            ? Math.ceil(rangeSize / 20)
            : Math.ceil(rangeSize / 50),
    }
  }, [column, defaultRange, getValidRange])

  const range = getValidRange(columnFilterValue, [min, max])

  const formatValue = (v) =>
    v.toLocaleString(undefined, { maximumFractionDigits: 0 })

  const handleInputChange = (idx) => (e) => {
    const val = Number(e.target.value)
    if (Number.isNaN(val)) return
    const next = [...range]
    next[idx] = val
    if (next[0] > next[1] || next[0] < min || next[1] > max) return
    column.setFilterValue(next)
  }

  const handleSliderChange = (value) => {
    if (getValidRange(value)) column.setFilterValue(value)
  }

  const handleReset = (e) => {
    if (e?.target instanceof HTMLDivElement) e.stopPropagation()
    column.setFilterValue(undefined)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-background hover:bg-accent dark:bg-input/30 dark:border-input dark:hover:bg-input/50 border-border h-8 w-full justify-start truncate rounded-md border border-dashed px-3 text-sm font-medium whitespace-nowrap shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50"
          aria-label={
            columnFilterValue
              ? `Clear ${t(title)} filter`
              : `Set ${t(title)} filter`
          }
          tabIndex={0}
        >
          {columnFilterValue ? (
            <div
              role="button"
              aria-label={`Clear ${t(title)} filter`}
              tabIndex={0}
              className="focus-visible:ring-ring rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:ring-1 focus-visible:outline-none"
              onClick={handleReset}
              onKeyDown={(e) =>
                (e.key === 'Enter' || e.key === ' ') && handleReset(e)
              }
            >
              <XCircle className="h-4 w-4" />
            </div>
          ) : null}
          <span>{t(title)}</span>
          {columnFilterValue && (
            <>
              <Separator orientation="vertical" className="mx-0.5 h-4" />
              {formatValue(range[0])} - {formatValue(range[1])}
              {unit ? ` ${unit}` : ''}
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="flex w-auto flex-col gap-4">
        <div className="flex flex-col gap-3">
          <p className="text-foreground leading-none font-medium">{t(title)}</p>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Input
                id={`${id}-from`}
                type="number"
                aria-valuemin={min}
                aria-valuemax={max}
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder={min.toString()}
                min={min}
                max={max}
                value={range[0]}
                onChange={handleInputChange(0)}
                className={`h-8 w-24${unit ? 'pr-8' : ''} text-foreground`}
                aria-label={`Minimum ${t(title)}`}
                tabIndex={0}
              />
              {unit && (
                <span className="bg-accent text-muted-foreground absolute top-0 right-0 bottom-0 flex items-center rounded-r-md px-2 text-sm">
                  {unit}
                </span>
              )}
            </div>
            <div className="relative">
              <Input
                id={`${id}-to`}
                type="number"
                aria-valuemin={min}
                aria-valuemax={max}
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder={max.toString()}
                min={min}
                max={max}
                value={range[1]}
                onChange={handleInputChange(1)}
                className={`h-8 w-24${unit ? 'pr-8' : ''} text-foreground`}
                aria-label={`Maximum ${t(title)}`}
                tabIndex={0}
              />
              {unit && (
                <span className="bg-accent text-muted-foreground absolute top-0 right-0 bottom-0 flex items-center rounded-r-md px-2 text-sm">
                  {unit}
                </span>
              )}
            </div>
          </div>
          <Slider
            id={`${id}-slider`}
            min={min}
            max={max}
            step={step}
            value={range}
            onValueChange={handleSliderChange}
            aria-label={`${t(title)} range slider`}
            tabIndex={0}
          />
        </div>
        <Button
          aria-label={`Clear ${t(title)} filter`}
          variant="outline"
          size="sm"
          className="text-foreground hover:text-foreground"
          onClick={handleReset}
          tabIndex={0}
        >
          {t('Tozalash')}
        </Button>
      </PopoverContent>
    </Popover>
  )
}

export default PriceFilter
