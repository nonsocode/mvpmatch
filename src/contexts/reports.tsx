import {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
  useState,
} from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { generateReport } from 'src/api/actions'
import type { Report } from 'src/types/api'
import { ReportFilter } from 'src/types/reports'
import { createReducer } from 'src/utils/reducers'

type ReportContextData = {
  reports: Report[]
  isFetchingReports: boolean
  commitFilters: () => void
  committedFilters: ReportFilter
} & ReturnType<typeof useReportsFilter>

const initializeFilterState = (): ReportFilter => ({
  from: null,
  to: null,
  projectId: null,
  gatewayId: null,
})

const Context = createContext<ReportContextData>(null as any)
export const useReportsContext = () => {
  return useContext(Context)
}

type DatePayload = {
  name: 'from' | 'to'
  date: Date | null
}

const useReportsFilter = () => {
  const [filters, dispatch] = useReducer(
    ...createReducer(
      {
        setDate: (state, { name, date }: DatePayload) => ({
          ...state,
          [name]: date,
        }),
        setProjectId: (state, projectId: string) => ({
          ...state,
          projectId,
        }),
        setGatewayId: (state, gatewayId: string) => ({
          ...state,
          gatewayId,
        }),
        setFilters: (state, filters: ReportFilter) => filters,
      },
      initializeFilterState(),
    ),
  )
  return {
    filters,
    setDate: (name: 'from' | 'to', date: Date | null) =>
      dispatch({ type: 'setDate', payload: { name, date } }),
    setProjectId: (projectId: string | null) =>
      dispatch({ type: 'setProjectId', payload: projectId }),
    setGatewayId: (gatewayId: string | null) =>
      dispatch({ type: 'setGatewayId', payload: gatewayId }),
    reset: () =>
      dispatch({ type: 'setFilters', payload: initializeFilterState() }),
  }
}

export const ReportsProvider = (props: PropsWithChildren<{}>) => {
  const filterModule = useReportsFilter()
  const [committedFilters, commitFilters] = useState(() => filterModule.filters)
  const { data: reports, isFetching: isFetchingReports } = useQuery(
    [committedFilters],
    {
      queryFn: ({ queryKey: [filters] }) => generateReport(filters),
    },
  )

  return (
    <Context.Provider
      {...props}
      value={{
        ...filterModule,
        committedFilters,
        commitFilters: () => commitFilters(filterModule.filters),
        isFetchingReports,
        reports: reports || [],
      }}
    />
  )
}
