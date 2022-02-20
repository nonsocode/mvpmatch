import { createContext, PropsWithChildren, useContext, useReducer } from 'react'
import { createReducer } from 'src/utils/reducers'

type ReportContextData = {} & ReturnType<typeof useReportsFilter>

const initializeFilterState = () => ({
  from: null as Date | null,
  to: null as Date | null,
  projectId: null as string | null,
  gatewayId: null as string | null,
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
        setGatewayId: (state, gatewayId) => ({
          ...state,
          gatewayId,
        }),
        resetFilters: () => initializeFilterState(),
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
    reset: () => dispatch({ type: 'resetFilters', payload: null }),
  }
}
export const ReportsProvider = ({ children }: PropsWithChildren<{}>) => {
  const reportsFilter = useReportsFilter()

  return (
    <Context.Provider value={{ ...reportsFilter }}>{children}</Context.Provider>
  )
}
