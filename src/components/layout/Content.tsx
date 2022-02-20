import styled from '@emotion/styled'
import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Card from '../Card'
import _Container from '../Container'
import Heading from '../Heading'

const Reports = lazy(() => import('src/views/Reports'))
const Container = styled(_Container)({
  overflow: 'auto',
})
const Content = () => {
  return (
    <Container>
      <Suspense fallback="Loading...">
        <Routes>
          <Route path="/" element={<Navigate to="/reports" />} />
          <Route path="reports/*" element={<Reports />} />
          <Route
            path="*"
            element={
              <Card variant="light" margin={20}>
                <Heading>Coming Soon</Heading>
              </Card>
            }
          />
        </Routes>
      </Suspense>
    </Container>
  )
}

export default Content
