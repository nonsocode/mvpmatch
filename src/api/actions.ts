import axios, { AxiosRequestTransformer, AxiosResponse } from 'axios'
import { client } from './client'
import {
  ApiResponse,
  GatewaysResponse,
  ProjectsResponse,
  Report,
  ReportsResponse,
} from '../types/api'
import { ReportFilter } from 'src/types/reports'
import { isNullish } from 'src/utils/presense'
import { ALL_KEY } from 'src/constants/filters'
import { isArray } from 'src/utils/array'
const dataGetter = <T>(res: AxiosResponse<ApiResponse<T>>) => {
  if (!res.data.data) throw new Error(res.data.error)
  return res.data.data
}

const getDefaultTransformers = (): AxiosRequestTransformer[] =>
  axios.defaults.transformRequest
    ? isArray(axios.defaults.transformRequest)
      ? axios.defaults.transformRequest
      : [axios.defaults.transformRequest]
    : []
export const getProjects = () =>
  client.get<ProjectsResponse>('projects').then(dataGetter)

export const getGateways = () =>
  client.get<GatewaysResponse>('gateways').then(dataGetter)

export const generateReport = (filter: ReportFilter): Promise<Report[]> => {
  if (Object.values(filter).every(isNullish)) return Promise.resolve([])
  return client
    .post<ReportsResponse>('report', filter, {
      transformRequest: [
        (data: ReportFilter): ReportFilter => {
          return {
            ...data,
            gatewayId: data.gatewayId === ALL_KEY ? null : data.gatewayId,
            projectId: data.projectId === ALL_KEY ? null : data.projectId,
          }
        },
        ...getDefaultTransformers()
      ],
    })
    .then(dataGetter)
}
