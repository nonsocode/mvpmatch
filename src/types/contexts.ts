import { getEntityName } from "src/utils/entity";
import { NamedEntity } from "./api";

export type SharedEntityContext<E extends NamedEntity> = {
  refetch: () => void
  findById: (id: string) => E | null
  getName: (item: Parameters<typeof getEntityName>[0]) => ReturnType<typeof getEntityName>
}