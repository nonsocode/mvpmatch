import { ALL_KEY } from 'src/constants/filters'
import { NamedEntity } from 'src/types/api'
import { Nullish } from 'src/types/presense'


export function getEntityName<
  E extends NamedEntity,
  F extends (id: string) => E | null,
>(
  item: E | Nullish<string>,
  finder: F,
  allFallback: string = 'All',
): E extends NamedEntity ? string : Nullish<string> {
  if (item === null) return null
  if (typeof item !== 'string') return item.name
  if (item === ALL_KEY) return allFallback
  return finder(item)?.name || ''
}
