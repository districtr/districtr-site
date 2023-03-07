import { ProblemProps } from '../utils/types'

export interface MapHeaderProps {
  problem: ProblemProps
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
  children?: React.ReactNode
}
