import './App.css'
import AuthProvider from './contexts/AuthContext/AuthProvider'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App
