import { ALL_KEY } from "src/constants/filters";

export const isAbsent = (item: any) => [ALL_KEY, null].includes(item)
