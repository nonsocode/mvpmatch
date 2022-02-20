import { Reducer } from 'react'

type ReducerObject<State, Obj> = {
  [T in keyof Obj]: ReducerFunction<Obj[T], State, T>
}

/*For some reason, all payloads default to any*/
type ReducerFunction<F, S, T> = F extends (
  prev: S,
  payload: infer P,
  type: T,
) => S
  ? (prev: S, payload: P, type: T) => S
  : (prev: S, payload: any, type: T) => S

type Actions<Obj extends ReducerObject<any, any>> = {
  [K in keyof Obj]: {
    type: K
    payload: Parameters<Obj[K]>[1]
  }
}

type Values<T> = T[keyof T]
export const createReducer = <State, Obj>(
  reducerObject: ReducerObject<State, Obj>,
  initialState: State,
): [Reducer<State, Values<Actions<ReducerObject<State, Obj>>>>, State] => {
  return [
    (state, action) => {
      if (action.type in reducerObject) {
        return reducerObject[action.type](state, action.payload, action.type)
      }
      return state
    },
    initialState,
  ]
}
