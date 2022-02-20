import styled from '@emotion/styled'
import { ALL_KEY } from 'src/constants/filters'
import { useGateways } from 'src/contexts/gateways'
import { useProjects } from 'src/contexts/projects'
import { useReportsContext } from 'src/contexts/reports'
import { isNullish } from 'src/utils/presense'
import Accordion from './Accordion'
import Card from './Card'
import LineCard from './LineCard'
import Text from './Text'

const StyledContent = styled.div({
  display: 'flex',
  gap: 30,
})
const ReportsContent = () => {
  const {
    isFetchingReports,
    reports: { length },
  } = useReportsContext()
  if (isFetchingReports && length === 0) return 'Loading...'
  if (length === 0) return 'No Content'
  return (
    <>
      <StyledContent>
        <ReportCards />
        <ReportCharts />
      </StyledContent>
    </>
  )
}

const StyledReportCard = styled(Card)({
  flex: 1,
})
const ReportCards = () => {
  const { isFetchingReports, committedFilters } = useReportsContext()
  const { getName: getProjectName } = useProjects()
  const { getName: getGatewayName } = useGateways()
  //@ts-ignore
  globalThis.getGatewayName = getGatewayName 
  if (isFetchingReports) return null
  const names = [
    getProjectName(committedFilters.projectId),
    getGatewayName(committedFilters.gatewayId),
  ]
    .filter((item) => !isNullish(item))
    .join(' | ')
  return (
    <StyledReportCard variant="light" padding={19}>
      <Text bold margin={'0 0 30px'}>
        {names}
      </Text>
      <Accordion gap={5}>
        <Accordion.Item trigger={<LineCard variant="blank">Hello</LineCard>}></Accordion.Item>
        <Accordion.Item trigger={<Card variant="blank">Hello</Card>}></Accordion.Item>
      </Accordion>
    </StyledReportCard>
  )
}

const ReportCharts = () => {
  const {} = useReportsContext()
  return null
}

export default ReportsContent
