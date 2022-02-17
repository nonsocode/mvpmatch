type NumberCharacter = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
type SuccessResponseCodeStart = '2'
type ErrorResponseCodeStart = '4' | '5'
type ResponseCodeEnd = `${NumberCharacter}${NumberCharacter}`
type SuccessResponseCode = `${SuccessResponseCodeStart}${ResponseCodeEnd}`
type ErrorResponseCode = `${ErrorResponseCodeStart}${ResponseCodeEnd}`
type ResponseCode = SuccessResponseCode | ErrorResponseCode
export type ApiResponse<Data, Code = ResponseCode> = {
  code: Code
} & (Code extends SuccessResponseCode
  ? { data: Data[]; error: null }
  : { data: null; error: any })

export type ProjectsResponse = ApiResponse<{
  projectId: string
  userIds: string[]
  rule: string
  gatewayIds: string[]
  structure: string
  industry: string
  website: string
  description: string
  image: string
  name: string
}>

export type UsersResponse = ApiResponse<{
  userId: string
  firstName: string
  lastName: string
  email: string
}>

export type GatewaysResponse = ApiResponse<{
  gatewayId: string
  userIds: string[]
  name: string
  type: string
  apiKey: string
  secondaryApiKey: string
  description: string
}>
