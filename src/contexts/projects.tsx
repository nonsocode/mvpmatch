import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
} from 'react'
import { useQuery } from 'react-query'
import { getProjects } from 'src/api/actions'
import { Project } from 'src/types/api'
import { SharedEntityContext } from 'src/types/contexts'
import { getEntityName } from 'src/utils/entity'

type ProjectsContext = {
  projects: Project[]
  projectMap: Record<string, Project>
} & SharedEntityContext<Project>

const Context = createContext<ProjectsContext>({} as ProjectsContext)

export const ProjectsProvider = (props: PropsWithChildren<{}>) => {
  const { data: projects = [], refetch: _refetch } = useQuery('projects', {
    queryFn: getProjects,
  })
  const refetch = useCallback(() => {
    _refetch({ cancelRefetch: true })
  }, [_refetch])

  const findById = useCallback(
    (id: string) =>
      projects.find((project) => project.projectId === id) ?? null,
    [projects],
  )

  const getName = useCallback(
    (item) => getEntityName(item, findById, 'All Projects'),
    [projects, findById],
  )

  const projectMap = useMemo(
    () =>
      Object.fromEntries(
        projects.map((project) => [project.projectId, project]),
      ),
    [projects],
  )
  return (
    <Context.Provider
      {...props}
      value={{ projects, refetch, findById, getName, projectMap }}
    />
  )
}

export const useProjects = () => useContext(Context)
