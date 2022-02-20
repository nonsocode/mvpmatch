import styled from '@emotion/styled'
import { useState } from 'react'
import DP from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { IconSize } from 'src/types/icon'
import { Calendar } from './icons'
type DatePickerProps = {
  value: Date | null
  label: string
  onChange: (date: Date | null) => void
  formatter?: (date: Date) => string
}
const DatePickerButton = styled.button({
  appearance: 'none',
  // minWidth: 115,
  minHeight: 32,
  border: 'none',
  background: '#1BC5BD',
  borderRadius: 5,
  padding: '8px 13px',
  color: 'white',
  paddingRight: 40,
})
const ValueWrapper = styled.span({
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
})
const CalendarIcon = styled(Calendar)({
  position: 'absolute',
  right: 13,
  top: '50%',
  transform: 'translateY(-50%)',
})

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

const defaultDateFormatter = (date: Date) => {
  const parts = Object.fromEntries(
    dateFormatter.formatToParts(date).map(({ type, value }) => [type, value]),
  )
  return `${parts.year}-${parts.month}-${parts.day}`
}
const DatePicker = ({
  value,
  label,
  onChange,
  formatter = defaultDateFormatter,
}: DatePickerProps) => {
  return (
    <DP
      selected={value}
      onChange={onChange}
      isClearable
      customInput={
        <DatePickerButton>
          <ValueWrapper>

          {value ? defaultDateFormatter(value) : label}{' '}
          </ValueWrapper>
          <CalendarIcon size={IconSize.SMALL} />
        </DatePickerButton>
      }
    />
  )
}
export default DatePicker
