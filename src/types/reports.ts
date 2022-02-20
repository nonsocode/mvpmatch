import { CSSProperties } from "@emotion/serialize"
import { Report } from "./api"

export type ReportFilter = {
  from: Date | null
  to: Date | null
  projectId: string | null
  gatewayId: string | null
}

export type ReportGroup = {
  name: string,
  chartName?: string,
  color: CSSProperties['color']
  total: number,
  reports: Report[]
}

