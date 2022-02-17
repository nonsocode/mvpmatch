import styled from '@emotion/styled'
import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import AppLogo from './components/layout/AppLogo'
import Content from './components/layout/Content'
import Header from './components/layout/Header'
import Navbar from './components/layout/Navbar'

const Layout = styled.div({
  display: 'grid',
  width: '100%',
  height: '100vh',
  gridTemplate: `
  'logo   header'    80px
  'nav    content'   1fr 
  'nav    footer'    60px / 90px 1fr`,
})

const queryClient = new QueryClient()
const App = () => {
  const [count, setCount] = useState(0)

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <AppLogo />
          <Header />
          <Navbar />
          <Content />
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
