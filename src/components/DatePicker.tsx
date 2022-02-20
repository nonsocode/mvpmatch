import styled from '@emotion/styled'
import { useState } from 'react'
import DP from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { IconSize } from 'src/types/icon'
import { dashYMD } from 'src/utils/date'
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



const DatePicker = ({
  value,
  label,
  onChange,
  formatter = dashYMD,
}: DatePickerProps) => {
  return (
    <DP
      selected={value}
      onChange={onChange}
      isClearable
      customInput={
        <DatePickerButton>
          <ValueWrapper>

          {value ? formatter(value) : label}{' '}
          </ValueWrapper>
          <CalendarIcon size={IconSize.SMALL} />
        </DatePickerButton>
      }
    />
  )
}
export default DatePicker
