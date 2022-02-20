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
  color: CSSProperties['color'] & string
  text: string
}
const DotSquare = styled.div<Pick<LabelProps, 'color'>>(({ color }) => ({
  backgroundColor: color,
  borderRadius: 5,
  height: 15,
  widht: 15,
}))

const LabelWrapper = styled.div({
  display: 'inline-flex',
  gap: 12,
  flexShrink: 0
})
const Label = ({ color, text }: LabelProps) => (
  <LabelWrapper>
    <DotSquare color={color} />
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
    () => groupedReports?.reduce((acc, group) => acc + group.total, 0),
    [groupedReports],
  )

  return (
    <Wrapper>
      <LineCard variant="light">
        {groupedReports?.map((group) => (
          <>
            <Label color="red" text={group.chartName || group.name} />
            <Label color="red" text={group.chartName || group.name} />
            <Label color="red" text={group.chartName || group.name} />
            <Label color="red" text={group.chartName || group.name} />
            <Label color="red" text={group.chartName || group.name} />
          </>
        ))}
      </LineCard>
      <ChartWrapper>
        <PieChart
          data={[
            { title: 'One', value: 10, color: '#E38627' },
            { title: 'Two', value: 15, color: '#C13C37' },
            { title: 'Three', value: 20, color: '#6A2135' },
          ]}
        />
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
