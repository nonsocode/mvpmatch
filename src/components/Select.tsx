import styled from '@emotion/styled'
import React, { ChangeEventHandler } from 'react'
import { IconSize } from 'src/types/icon'
import { isNullish } from 'src/utils/presense'
import { CaretDown } from './icons'
type SelectOptions<T> = {
  options: T[]
  value?: T
  name: string
  getOptionValue?: (item: T) => string
  renderOption?: (item: T) => string
  onSelect?: (item: T | null) => void
  disableEmpty?: boolean
}
const stringify = (item: any) => String(item)
const Icon = styled(CaretDown)({
  position: 'absolute',
  right: 13,
  top: '50%',
  transform: 'translateY(-40%)',
})
const SelectWrapper = styled.div({
  position: 'relative',
})
const StyledSelect = styled.select({
  appearance: 'none',
  minWidth: 115,
  minHeight: 32,
  border: 'none',
  background: '#1BC5BD',
  borderRadius: 5,
  padding: '8px 13px',
  color: 'white',
  paddingRight: 40,
})
const Select = <T extends unknown>({
  options,
  getOptionValue = stringify,
  renderOption = stringify,
  onSelect,
  value,
  name,
  disableEmpty = false,
}: SelectOptions<T>) => {
  const handleSelect: ChangeEventHandler = (e) => {
    if (!onSelect) return
    const item = options.find(
      (item) => getOptionValue(item) === (e.target as HTMLSelectElement).value,
    )
    onSelect(item ?? null)
  }
  return (
    <SelectWrapper>
      <StyledSelect
        onChange={handleSelect}
        value={value ? getOptionValue(value) : ''}
      >
        <option value="" disabled={disableEmpty}>
          Select {name}
        </option>
        {options.map((option, i) => {
          const optionValue = getOptionValue(option)
          return (
            <option key={optionValue} value={optionValue}>
              {renderOption(option)}
            </option>
          )
        })}
      </StyledSelect>
      <Icon size={IconSize.SMALL} primaryColor="white" />
    </SelectWrapper>
  )
}

export default Select
