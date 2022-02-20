import { Report } from 'src/types/api'
import { ReportGroup } from 'src/types/reports'

export const groupReports = <Id extends string>(
  reports: Report[],
  keyGetter: (report: Report) => Id,
  nameGetter: (id: Id) => string,
  altNameGetter?: (id: Id) => string,
): ReportGroup[] => {
  const groups: ReportGroup[] =  Object.values(
    reports.reduce((groups, report) => {
      const id = keyGetter(report)
      let group = groups[id]
      if (!group) {
        group = {
          total: 0,
          color: 'black',
          name: nameGetter(id),
          chartName: altNameGetter?.(id),
          reports: [],
        }
        groups[id] = group
      }
      group.total += report.amount
      group.chartName
      group.reports.push(report)
      return groups
    }, {} as Record<Id, ReportGroup>),
  )
  return groups.sort((a,b) => a.name.localeCompare(b.name))
}
