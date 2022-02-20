import { useMemo } from 'react'
import { useGateways } from 'src/contexts/gateways'
import { useProjects } from 'src/contexts/projects'
import { Report } from 'src/types/api'
import { groupReports } from 'src/utils/grouper'
import { isAbsent } from 'src/utils/reports'

export const useReportGrouping = (
  projectId: string | null,
  gatewayId: string | null,
  reports: Report[],
) => {
  const { getName: getProjectName } = useProjects()
  const { getName: getGatewayName, findById: findGateway } = useGateways()
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
          (id) => findGateway(id)!.type,
        )
    }
    return null
  }, [projectId, gatewayId, reports])
  return groupedReports
}
