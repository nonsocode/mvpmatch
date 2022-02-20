import styled from '@emotion/styled'
import Card from 'src/components/Card'
import Heading from 'src/components/Heading'
import ReportsContent from 'src/components/ReportsContent'
import ReportsFilters from 'src/components/ReportsFilters'
import { GatewaysProvider } from 'src/contexts/gateways'
import { ProjectsProvider } from 'src/contexts/projects'
import { ReportsProvider } from 'src/contexts/reports'

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100%',
})
const ReportsHeader = styled.div({
  paddingTop: 30,
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
})

const Reports = () => {
  return (
    <ReportsProvider>
      <GatewaysProvider>
        <ProjectsProvider>
          <Wrapper>
            <ReportsHeader>
              <div>
                <Heading size="h3">Reports</Heading>
                <Heading size="h5" muted>
                  Easily generate a report of your transactions
                </Heading>
              </div>
              <ReportsFilters />
            </ReportsHeader>
            <ReportsContent />
          </Wrapper>
        </ProjectsProvider>
      </GatewaysProvider>
    </ReportsProvider>
  )
}

export default Reports
