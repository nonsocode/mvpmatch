import styled from '@emotion/styled'
import { useMemo } from 'react'
import { ALL_KEY } from 'src/constants/filters'
import { useGateways } from 'src/contexts/gateways'
import { useProjects } from 'src/contexts/projects'
import { useReportsContext } from 'src/contexts/reports'
import { ReportGroup } from 'src/types/reports'
import { groupReports } from 'src/utils/grouper'
import { formatMoney } from 'src/utils/money'
import Accordion from './Accordion'
import Card from './Card'
import LineCard from './LineCard'
import ReportsTable from './ReportsTable'
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

const StyledReportCard = styled.div({
  flex: 1,
})
const isAbsent = (item: any) => [ALL_KEY, null].includes(item)

const ReportCards = () => {
  const {
    isFetchingReports,
    committedFilters: { projectId, gatewayId },
    reports,
  } = useReportsContext()
  const { getName: getProjectName } = useProjects()
  const { getName: getGatewayName, findById: findGateway } = useGateways()
  if (isFetchingReports) return null
  const names = [
    getProjectName(projectId) || 'All Projects',
    getGatewayName(gatewayId) || 'All Gateways',
  ].join(' | ')
  const groupedReports = useMemo(() => {
    switch (true) {
      case isAbsent(projectId) && !isAbsent(gatewayId):
      case isAbsent(projectId) && isAbsent(gatewayId):
        return groupReports(
          reports,
          (report) => report.projectId,
          (id) => getProjectName(id),
        )
      case isAbsent(gatewayId) && !isAbsent(projectId):
        return groupReports(
          reports,
          (report) => report.gatewayId,
          (id) => getGatewayName(id),
          (id) => findGateway(id).type,
        )
    }
    return null
  }, [projectId, gatewayId])

  const showBottomTotal = useMemo(
    () =>
      (groupedReports && isAbsent(projectId) && isAbsent(gatewayId)) ||
      (!isAbsent(projectId) && !isAbsent(gatewayId)),
    [groupedReports, projectId, gatewayId],
  )
  return (
    <StyledReportCard>
      <Card variant="light" padding={19}>
        <Text bold margin={'0 0 30px'}>
          {names}
        </Text>
        {groupedReports ? (
          <Accordion gap={5}>
            {groupedReports.map((group) => {
              return (
                <Accordion.Item
                  key={group.name}
                  trigger={
                    <LineCard variant="blank">
                      <Text bold>{group.name}</Text>
                      <Text bold>TOTAL: {formatMoney(group.total)}</Text>
                    </LineCard>
                  }
                >
                  <ReportsTable reports={group.reports} />
                </Accordion.Item>
              )
            })}
          </Accordion>
        ) : (
          <ReportsTable reports={reports} />
        )}
      </Card>
      {showBottomTotal && (
        <Card margin={'30px 0 0'} variant="light">
          <Text bold>
            TOTAL |{' '}
            {formatMoney(
              groupedReports
                ? groupedReports.reduce((a, r) => a + r.total, 0)
                : reports.reduce((a, r) => a + r.amount, 0),
            )}
          </Text>
        </Card>
      )}
    </StyledReportCard>
  )
}

const ReportCharts = () => {
  const {} = useReportsContext()
  return <></>
}

export default ReportsContent
