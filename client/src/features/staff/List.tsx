// import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons'
// import { Button, Space } from 'antd'
// import { ColumnsType } from 'antd/es/table'
// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import DefaultLayout from '~/components/Layout/DefaultLayout'
// import StaffTable from './StaffTable'
// import { useEffectOnce } from 'usehooks-ts'
// import useStaffStore from './StaffStore'

// const List = () => {
//   const navigate = useNavigate()
//   const [users] = useStaffStore(state => [
//     state.users
//   ])
//   return (
//     <DefaultLayout>
//       <div className="mb-2 flex min-h-full flex-col">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center justify-between">
//             <ArrowLeftOutlined className="mb-2 me-4" onClick={() => navigate(-1)} />
//           </div>
//           <span>
//             <Space>
//               <Button
//                 onClick={() => {
//                   navigate(`/nhan-vien/create/`)
//                 }}
//               >
//                 Thêm nhân viên mới
//               </Button>
//             </Space>
//           </span>
//         </div>
//         <div className="mt-2 h-full grow rounded-lg bg-bgPrimary px-4 py-2 shadow-md">
//           <div className="flex w-full items-center justify-between">
//             <p className="text-2x1 font-medium">Danh sách nhân viên</p>
//           </div>
//           <StaffTable staffs={users}/>
//         </div>
//       </div>
//     </DefaultLayout>
//   )
// }

// export default List
