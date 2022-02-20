import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
} from 'react'
import { useQuery } from 'react-query'
import { getGateways } from 'src/api/actions'
import { Gateway } from 'src/types/api'
import { SharedEntityContext } from 'src/types/contexts'
import { getEntityName } from 'src/utils/entity'

type GatewaysContext = {
  gateways: Gateway[]
  gatewayMap: Record<string, Gateway>
} & SharedEntityContext<Gateway>

const Context = createContext<GatewaysContext>({} as GatewaysContext)

export const GatewaysProvider = (props: PropsWithChildren<{}>) => {
  const { data: gateways = [], refetch: _refetch } = useQuery('gateways', {
    queryFn: getGateways,
  })
  const refetch = useCallback(() => {
    _refetch({ cancelRefetch: true })
  }, [_refetch])

  const findById = useCallback(
    (id: string) =>
      gateways.find((gateway) => gateway.gatewayId === id) ?? null,
    [gateways],
  )
  const gatewayMap = useMemo(
    () =>
      Object.fromEntries(
        gateways.map((gateway) => [gateway.gatewayId, gateway]),
      ),
    [gateways],
  )
  const getName = useCallback(
    (item) => getEntityName(item, findById, 'All Gateways'),
    [gateways, findById],
  )

  return (
    <Context.Provider
      {...props}
      value={{ gateways: gateways, refetch, findById, getName, gatewayMap }}
    />
  )
}

export const useGateways = () => useContext(Context)
