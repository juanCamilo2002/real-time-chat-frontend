import { Toaster } from 'sonner'
import { Route, Routes } from 'react-router'
import AutPage from './pages/auth/AuthPage'
import { GuestRoute, PrivateRoute } from './features/auth/components/PageGuards'
import Chat from './pages/chat/ChatPage'

function App() {
  return (
    <>
      <Toaster position='top-right' />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<Chat />} />
        </Route>
        <Route element={<GuestRoute />}>
          <Route path='/auth' element={<AutPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
