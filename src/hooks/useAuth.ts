import { AuthContext } from '@contexts/AuthContext/AuthContext'
import type { AuthContextType } from '@contexts/AuthContext/types'
import { useContext } from 'react'

const useAuth = ():AuthContextType => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export default useAuth