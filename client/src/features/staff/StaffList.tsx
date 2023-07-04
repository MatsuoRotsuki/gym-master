import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Input, Space } from 'antd'
import React, { useEffect } from 'react'
import HomeLayout from '~/components/Layout/HomeLayout'
import StaffTable from './StaffTable'
import { useNavigate, useParams } from 'react-router-dom'
import { useStaffStore } from '~/staffStore'
import { useEffectOnce } from 'usehooks-ts'

interface Props {}

const StaffList = () => {
    const navigate = useNavigate()

    const [staffs, getAllStaff] = useStaffStore(state => [
        state.staffs,
        state.getAllStaff
    ])

    useEffectOnce(() => {
        getAllStaff()
    })
  return (
        <HomeLayout>
            <div className="mb-2 flex min-h-full flex-col">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-between">
                        <ArrowLeftOutlined className='me-4 mb-2' onClick={() => navigate(-1)} />
                        <Input.Search className="w-[25vw]" placeholder="Tìm kiếm gì đó ..." />
                    </div>
                    <Space>
                        <Button onClick={() => {
                            navigate(`/nhan-vien/create`)
                        }}>Thêm nhân viên mới</Button>
                    </Space>
                </div>
                {/* <TabList defaultActiveKey='2' eventId={id} /> */}
                <div className="mt-2 h-full grow rounded-lg bg-bgPrimary px-4 py-2 shadow-md">
                    <div className="flex w-full items-center justify-between">
                        <p className="text-2x2 font-medium">Danh sách nhân viên</p>
                    </div>
                    <StaffTable staffs={staffs} />
                </div>
            </div>
        </HomeLayout>
  )
}

export default StaffList