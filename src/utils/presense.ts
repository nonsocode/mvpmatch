export const isNullish = (obj: any): obj is null | undefined => [undefined, null].includes(obj)
export const isUndefined = (obj: any): obj is undefined => obj === undefined
