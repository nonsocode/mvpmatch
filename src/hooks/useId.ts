import { useState } from 'react'

let _id = 1
export const useId = () => {
  const [id] = useState(() => _id++)
  return id
}
