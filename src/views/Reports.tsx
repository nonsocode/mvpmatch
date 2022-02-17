import styled from '@emotion/styled'
import React from 'react'
import Heading from 'src/components/Heading'

const Wrapper = styled.div({
  marginTop: 30
})
const Reports = () => {
  return (
    <Wrapper>
      <div>
        <Heading size="h3">Reports</Heading>
        <Heading size="h4" muted>
          Easily generate a report of your transactions
        </Heading>
      </div>
    </Wrapper>
  )
}
export default React.memo(Reports)