import { UseScrollTriggerOptions } from '@mui/material/useScrollTrigger/useScrollTrigger'
import { useEffect, useState } from 'react'
const useHScrollTrigger = ({ target }: UseScrollTriggerOptions) => {
  const [trigger, setTrigger] = useState(false)

  useEffect(() => {
    function pos() {
      if ((target as HTMLElement).scrollLeft > 0) {
        setTrigger(true)
      } else {
        setTrigger(false)
      }
    }

    if (target) {
      ;(target as HTMLElement).addEventListener('scroll', pos)
    }

    return () => target && (target as HTMLElement).removeEventListener('scroll', pos)
  }, [target])

  return trigger
}
export { useHScrollTrigger }
