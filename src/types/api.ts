type NumChar = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
type SuccessResponseCodeStart = '2'
type ErrorResponseCodeStart = '4' | '5'
type ResponseCodeEnd = `${NumChar}${NumChar}`
type SuccessResponseCode = `${SuccessResponseCodeStart}${ResponseCodeEnd}`
type ErrorResponseCode = `${ErrorResponseCodeStart}${ResponseCodeEnd}`
type ResponseCode = SuccessResponseCode | ErrorResponseCode
type DateString = `20${NumChar}${NumChar}-${
  | `0${Exclude<NumChar, '0'>}`
  | `1${'0' | '1' | '2'}`}-${`${'0' | '1' | '2'}${NumChar}` | `3${'0' | '1'}`}`
export type ApiResponse<Data, Code = ResponseCode> = {
  code: Code
} & (Code extends SuccessResponseCode
  ? { data: Data[]; error: null }
  : { data: null; error: any })

export type Project = {
  projectId: string
  userIds: string[]
  rule: string
  gatewayIds: string[]
  structure: string
  industry: string
  website: string
  description: string
  image: string
}

export type NamedEntity = {
  name: string
}

export type LiteEntity = {
  id: string,
} & NamedEntity

export type ProjectsResponse = ApiResponse<Project>

type User = {
  userId: string
  firstName: string
  lastName: string
  email: string
}

export type UsersResponse = ApiResponse<User>

export type Gateway = {
  gatewayId: string
  userIds: string[]
  type: string
  apiKey: string
  secondaryApiKey: string
  description: string
} & NamedEntity

export type GatewaysResponse = ApiResponse<Gateway>

export type Report = {
  paymentId: string
  amount: number
  projectId: string
  gatewayId: string
  userIds: string[]
  modified: DateString
  created: DateString
}

export type ReportsResponse = ApiResponse<Report>
