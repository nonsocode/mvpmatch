import styled from '@emotion/styled'
import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import _Container  from '../Container'

const Reports = lazy(() => import('src/views/Reports'))
const Container = styled(_Container)({
  overflow: 'auto'
})
const Content = () => {
  return (
    <Container>
      <Suspense fallback="Loading...">
        <Routes>
          <Route path="/" element={<Navigate to="/reports" />} />
          <Route path="reports/*" element={<Reports />} />
        </Routes>
      </Suspense>
    </Container>
  )
}

export default Content
