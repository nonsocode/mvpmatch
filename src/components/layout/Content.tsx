import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Container from '../Container'
const Reports = lazy(() => import('src/views/Reports'))
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
