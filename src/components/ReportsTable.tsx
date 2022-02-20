import { Report } from 'src/types/api'
import { slashMDY } from 'src/utils/date'
import { formatMoney } from 'src/utils/money'
import Table from './Table'

type ReportsTableProps = {
  reports: Report[]
}
const ReportsTable = ({ reports }: ReportsTableProps) => {
  return (
    <Table
      columns={[
        {
          title: 'Date',
          get: (item) => slashMDY(item.created),
          alignment: 'left',
        },
        {
          title: 'Transacion Id',
          get: (item) => item.paymentId,
          alignment: 'center',
        },
        {
          title: 'Amount',
          get: (item) => formatMoney(item.amount),
          alignment: 'right',
        },
      ]}
      rows={reports}
    />
  )
}

export default ReportsTable
