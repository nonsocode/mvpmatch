import styled from '@emotion/styled'
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { getGateways, getProjects } from 'src/api/index'
import { Gateway, LiteEntity, Project } from 'src/api/types'
import { useReportsContext } from 'src/contexts/reports'
import Button from './Button'
import DatePicker from './DatePicker'
import Select from './Select'
const FilterList = styled.ul({
  display: 'flex',
  gap: 23,
  padding: 0,
  listStyle: 'none',
})
const FilterItem = styled.li({})
const ALL_KEY = '__ALL__'

const liteProject = ({ projectId: id, name }: Project): LiteEntity => ({
  id,
  name,
})

const liteGateway = ({ gatewayId: id, name }: Gateway): LiteEntity => ({
  id,
  name,
})

const renderEntity = (entity: LiteEntity) => entity.name
const getEntityValue = (entity: LiteEntity) => entity.id 
const ReportsFilters = () => {
  const { filters, setDate, setGatewayId, setProjectId } = useReportsContext()
  const { data: _projects } = useQuery('projects', {
    queryFn: getProjects,
  })
  const { data: _gateways } = useQuery('gateways', {
    queryFn: getGateways,
  })
  const { projects, currentProject } = useMemo(() => {
    const all = { id: ALL_KEY, name: 'All Projects' }
    const projects = [all, ...(_projects?.map(liteProject) || [])]
    const currentProject = projects.find(
      (project) => project.id === filters.projectId,
    )
    return { projects, currentProject }
  }, [_projects, filters.projectId])

  const { gateways, currentGateway } = useMemo(() => {
    const all = { id: ALL_KEY, name: 'All Gateways' }
    const gateways = [all, ...(_gateways?.map(liteGateway) || [])]
    const currentGateway = gateways.find(
      (gateway) => gateway.id === filters.gatewayId,
    )
    return { gateways, currentGateway }
  }, [_gateways, filters.gatewayId])

  return (
    <FilterList>
      <FilterItem key={1}>
        <Select
          name="projects"
          value={currentProject}
          onSelect={(item) => setProjectId(item?.id || null)}
          options={projects}
          renderOption={renderEntity}
          getOptionValue={getEntityValue}
        />
      </FilterItem>
      <FilterItem key={2}>
        <Select
          name="gateway"
          value={currentGateway}
          options={gateways}
          onSelect={(item) => setGatewayId(item?.id || null)}
          renderOption={renderEntity}
          getOptionValue={getEntityValue}
        />
      </FilterItem>
      <FilterItem key={3}>
        <DatePicker
          label="From date"
          value={filters.from}
          onChange={(value) => {
            setDate('from', value)
          }}
        />
      </FilterItem>
      <FilterItem key={4}>
        <DatePicker
          label="To date"
          value={filters.to}
          onChange={(value) => {
            setDate('to', value)
          }}
        />
      </FilterItem>
      <FilterItem key={5}>
        <Button>Generate report</Button>
      </FilterItem>
    </FilterList>
  )
}

export default ReportsFilters
