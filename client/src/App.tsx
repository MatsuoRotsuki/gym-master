import { Routes, Route, Outlet } from 'react-router-dom'
import Prefetch from './features/auth/Prefetch'
import Overview from './features/auth/Overview'
import Feedback from './features/auth/Feedback'

import GymList from './features/gym/List'
import GymCreate from './features/gym/Create'
import GymEdit from './features/gym/Edit'
import GymDetail from './features/gym/Detail'

import StaffList from './features/staff/List'
import StaffCreate from './features/staff/Create'
import StaffEdit from './features/staff/Edit'
import StaffDetail from './features/staff/Detail'

import EquipmentList from './features/equipment/List'
import EquipmentEdit from './features/equipment/Edit'

import SubscriptionList from './features/subscription/List'
import SubscriptionCreate from './features/subscription/Create'
import SubscriptionEdit from './features/subscription/Edit'
import SubscriptionDetail from './features/subscription/Detail'

import MemberList from './features/member/List'
import MemberCreate from './features/member/Create'
import MemberEdit from './features/member/Edit'
import MemberDetail from './features/member/Detail'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route element={<Prefetch />}>
          <Route index element={<Overview />} />

          <Route path="phong-tap">
            <Route index element={<GymList />} />
            <Route path="create" element={<GymCreate />} />
            <Route path="edit" element={<GymEdit />} />
            <Route path=":id" element={<GymDetail />} />
          </Route>

          <Route path="nhan-vien">
            <Route index element={<StaffList />} />
            <Route path="create" element={<StaffCreate />} />
            <Route path="edit" element={<StaffEdit />} />
            <Route path=":id" element={<StaffDetail />} />
          </Route>

          <Route path="goi-tap">
            <Route index element={<SubscriptionList />} />
            <Route path="create" element={<SubscriptionCreate />} />
            <Route path="edit" element={<SubscriptionEdit />} />
            <Route path=":id" element={<SubscriptionDetail />} />
          </Route>

          <Route path="thiet-bi">
            <Route index element={<EquipmentList />} />
          </Route>

          <Route path="hoi-vien">
            <Route index element={<MemberList />} />
            <Route path="create" element={<MemberCreate />} />
            {/* <Route path="edit" element={<MemberEdit />} />
            <Route path=":id" element={<MemberDetail />} /> */}
          </Route>

          <Route path="phan-hoi" element={<Feedback />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
