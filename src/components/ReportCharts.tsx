import styled from '@emotion/styled'
import { useMemo } from 'react'
import { useReportsContext } from 'src/contexts/reports'
import { useReportGrouping } from 'src/hooks/useReportGrouping'
import { isAbsent } from 'src/utils/reports'
import Text from './Text'
import LineCard from './LineCard'
import { PieChart } from 'react-minimal-pie-chart'
import { formatMoney } from 'src/utils/money'
import { CSSProperties } from '@emotion/serialize'

const Wrapper = styled.div({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
})
const ChartWrapper = styled.div({
  margin: '30px 0',
})
type LabelProps = {
  color: string
  text: string
}
const DotSquare = styled.div<{ backgroundColor: string }>(
  ({ backgroundColor }) => ({
    backgroundColor,
    borderRadius: 5,
    height: 15,
    width: 15,
  }),
)

const LabelWrapper = styled.div({
  display: 'inline-flex',
  gap: 12,
  alignItems: 'center',
  flexShrink: 0,
})
const Label = ({ color, text }: LabelProps) => (
  <LabelWrapper>
    <DotSquare backgroundColor={color} />
    <Text>{text}</Text>
  </LabelWrapper>
)
export const ReportCharts = () => {
  const {
    committedFilters: { gatewayId, projectId },
    reports,
  } = useReportsContext()

  const groupedReports = useReportGrouping(projectId, gatewayId, reports)

  const total = useMemo(
    () => groupedReports?.reduce((acc, group) => acc + group.total, 0) || 0,
    [groupedReports],
  )

  const pieData =
    groupedReports?.map((group) => ({
      title: group.chartName || group.name,
      value: (group.total / total) * 100,
      label: (group.total / total) * 100 + '%',
      color: group.color as string,
    })) || []

  return (
    <Wrapper>
      <LineCard variant="light">
        {groupedReports?.map((group) => (
          <Label
            color={group.color as string}
            text={group.chartName || group.name}
          />
        ))}
      </LineCard>
      <ChartWrapper>
        <PieChart lineWidth={45} data={pieData} radius={50}/>
      </ChartWrapper>
      <LineCard variant="light">
        <Text bold>
          {!isAbsent(projectId) ? 'PROJECT ' : 'GATEWAY'} TOTAL |{' '}
          {formatMoney(total || 0)}
        </Text>
      </LineCard>
    </Wrapper>
  )
}
