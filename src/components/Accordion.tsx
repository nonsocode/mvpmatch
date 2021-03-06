import styled from '@emotion/styled'
import {
  createContext,
  CSSProperties,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import Collapsible from 'react-collapsible'
import { useId } from 'src/hooks/useId'

type AccordionContext = {
  register(id: number): void
  unregister(id: number): void
  isOpen(id: number): boolean
  toggle(id: number): void
}
type AccordionProps = {
  defaultState?: boolean
  gap?: CSSProperties['gap']
  multiple?: boolean
}
type AccorionItemProps = {
  trigger: JSX.Element
}

const Context = createContext<AccordionContext>({
  register: (id: number) => {},
  unregister: (id: number) => {},
  toggle: (id: number) => {},
  isOpen: (id: number) => false,
})

const StyledAccordion = styled.div<{ gap?: AccordionProps['gap'] }>(
  ({ gap }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap,
  }),
)
const Accordion = ({
  children,
  gap,
  defaultState = false,
  multiple = false,
}: PropsWithChildren<AccordionProps>) => {
  const [state, setState] = useState<{ [k: string]: boolean }>({})
  const register = (id: number) => {
    setState((state) => ({
      ...state,
      [id]: state[id] ?? defaultState,
    }))
  }
  const unregister = (id: number) => {
    setState((state) => {
      state = { ...state }
      delete state[id]
      return state
    })
  }
  const isOpen = (id: number) => !!state[id]
  const toggle = (id: number) => {
    setState((state) => {
      return {
        ...(multiple ? state : null),
        [id]: !state[id],
      }
    })
  }
  return (
    <Context.Provider value={{ register, unregister, isOpen, toggle }}>
      <StyledAccordion gap={gap}>{children}</StyledAccordion>
    </Context.Provider>
  )
}
const Pointable = styled.div({ cursor: 'pointer' })
const AccordionItem = ({
  trigger,
  children,
}: PropsWithChildren<AccorionItemProps>) => {
  const { register, unregister, isOpen, toggle } = useContext(Context)
  const id = useId()
  useEffect(() => {
    register(id)
    return () => unregister(id)
  }, [])

  return (
    <Collapsible
      trigger={<Pointable>{trigger}</Pointable>}
      children={children}
      open={isOpen(id)}
      transitionTime={200}
      handleTriggerClick={() => {
        toggle(id)
      }}
    />
  )
}
Accordion.Item = AccordionItem
export default Accordion
