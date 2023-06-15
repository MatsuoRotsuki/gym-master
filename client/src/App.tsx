import { Routes, Route, Outlet } from 'react-router-dom'
import Room from './features/gym/Room'
import Prefetch from './features/auth/Prefetch'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route element={<Prefetch />}>
          <Route index element={<Room />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
