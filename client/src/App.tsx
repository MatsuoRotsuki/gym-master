import { Routes, Route, Outlet } from 'react-router-dom'
import Prefetch from './features/auth/Prefetch'
import Overview from './features/auth/Overview'

import GymList from './features/gym/List'

import StaffList from './features/staff/StaffList'
import StaffCreate from './features/staff/Create'
import StaffEdit from './features/staff/Edit'
import StaffDetail from './features/staff/Detail'

import EquipmentList from './features/equipment/List'

import SubscriptionList from './features/subscription/List'
import SubscriptionDetail from './features/subscription/Detail'

import MemberList from './features/member/List'

import FeedBackList from './features/feedback/List'
import FeedBackDetail from './features/feedback/Detail'
import Login from './features/auth/Login'
import RequireAuth from './features/auth/RequireAuth'
import LoggedIn from './features/auth/LoggedIn'
import Account from './features/auth/Account'
import SubcribePlan from './features/subscription/SubcribePlan'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route element={<LoggedIn />}>
          <Route path="dang-nhap" element={<Login />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route element={<Prefetch />}>
            <Route index element={<Overview />} />

            <Route path="phong-tap">
              <Route index element={<GymList />} />
              {/* <Route path="create" element={<GymCreate />} /> */}
              {/* <Route path="edit" element={<GymEdit />} /> */}
              {/* <Route path=":id" element={<GymDetail />} /> */}
            </Route>

            <Route path="nhan-vien">
              <Route index element={<StaffList />} />
              <Route path="create" element={<StaffCreate />} />
              <Route path="edit/:id" element={<StaffEdit />} />
              <Route path=":id" element={<StaffDetail />} />
            </Route>

            <Route path="goi-tap">
              <Route index element={<SubscriptionList />} />
              <Route path=":id" element={<SubscriptionDetail />} />
              <Route path=":id/dang-ky" element={<SubcribePlan />} />
            </Route>

            <Route path="thiet-bi">
              <Route index element={<EquipmentList />} />
            </Route>

            <Route path="hoi-vien">
              <Route index element={<MemberList />} />
            </Route>

            <Route path="phan-hoi">
              <Route index element={<FeedBackList />} />
              <Route path=":id" element={<FeedBackDetail />} />
            </Route>

            <Route path="tai-khoan">
              <Route index element={<Account />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
