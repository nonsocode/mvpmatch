import styled from '@emotion/styled'
import  {  ReactChild } from 'react'
import { Colors } from 'src/types/colors'
type TableProps<T> = {
  columns: {
    title: string
    get: (item: T) => ReactChild
    alignment?: 'left' | 'right' | 'center'
  }[]
  rows: T[]
  stickyHeader?: boolean
}

const Head = styled.thead<{ sticky: boolean }>(({ sticky }) => ({
  ...(sticky && {
    position: sticky ? 'sticky' : 'relative',
    top: 0,
  }),
  '& th': {
    background: Colors.TERTIARY,
  },
}))

const Body = styled.tbody({
  '& tr td': {
    background: Colors.TERTIARY,
  },
  '& tr:nth-of-type(2n + 1) td': {
    background: Colors.SECONDARY_LIGHT,
  },
})

const StyledTable = styled.table({
  width: '100%',
  borderCollapse: 'collapse',
  margin: '10px 0'
})
const cellStyles = {
  padding: '5px 20px',
  lineHeight: '26px',
  fontWeight: 'normal'
}
const Th = styled.th<{ align: 'left' | 'center' | 'right' }>(({ align }) => ({
  ...cellStyles,
  textAlign: align,
}))
const Td = styled.td<{ align: 'left' | 'center' | 'right' }>(({ align }) => ({
  ...cellStyles,
  textAlign: align,
}))
const Table = <T,>({ columns, rows, stickyHeader = true }: TableProps<T>) => {
  return (
    <StyledTable>
      <Head sticky={stickyHeader}>
        <tr>
          {columns.map((col) => (
            <Th align={col.alignment || 'left'} key={col.title}>
              {col.title}
            </Th>
          ))}
        </tr> 
      </Head>
      <Body>
        {rows.map((row, i) => (
          <tr key={i}>
            {columns.map((col) => (
              <Td align={col.alignment || 'left'} key={col.title}>
                {col.get(row)}
              </Td>
            ))}
          </tr>
        ))}
      </Body>
    </StyledTable>
  )
}

export default Table
