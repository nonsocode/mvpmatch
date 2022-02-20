import { AxiosResponse } from 'axios'
import { client } from './client'
import { ApiResponse, GatewaysResponse, ProjectsResponse } from './types'
const dataGetter = <T>(res: AxiosResponse<ApiResponse<T>>) => {
  if (!res.data.data) throw new Error(res.data.error)
  return res.data.data
}
export const getProjects = () =>
  client.get<ProjectsResponse>('projects').then(dataGetter)

export const getGateways = () =>
  client.get<GatewaysResponse>('gateways').then(dataGetter)