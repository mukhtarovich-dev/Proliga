/* eslint-disable no-unused-vars */

import * as React from 'react'
import * as RPNInput from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'

import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'

import { cn } from 'lib/utils'
import { forwardRef } from 'react'

const PhoneInput = forwardRef(({ className, onChange, ...props }, ref) => {
  return (
    <RPNInput.default
      ref={ref}
      className={cn('flex', className)}
      flagComponent={FlagComponent}
      countryCallingCodeEditable={false}
      countrySelectComponent={CountrySelect}
      inputComponent={InputComponent}
      onChange={(value) => onChange?.(value || '')}
      {...props}
    />
  )
})
PhoneInput.displayName = 'PhoneInput'

const InputComponent = React.forwardRef(({ className, ...props }, ref) => (
  <Input
    className={cn(
      'text-foreground bg-input/80 rounded-s-none rounded-e md:text-base',
      className
    )}
    {...props}
    ref={ref}
  />
))
InputComponent.displayName = 'InputComponent'

const CountrySelect = ({ disabled, value, onChange, options }) => {
  return (
    <Button
      type="button"
      variant={'outline-solid'}
      className={cn(
        'text-foreground border-input flex items-center justify-center gap-1 rounded rounded-s rounded-e-none border-y border-r-0 border-l px-2 text-sm'
      )}
      disabled={disabled}
    >
      <FlagComponent country={value} countryName={value} />
      {value && (
        <p className="text-foreground ml-1">
          +{RPNInput?.getCountryCallingCode(value)}
        </p>
      )}
    </Button>
  )
}

const FlagComponent = ({ country, countryName }) => {
  const Flag = flags[country]

  return (
    <span className="flex h-full overflow-hidden">
      {Flag && <Flag title={countryName} />}
    </span>
  )
}
FlagComponent.displayName = 'FlagComponent'

export { PhoneInput }
