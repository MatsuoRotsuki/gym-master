import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Input, Space } from 'antd'
import React, { useEffect } from 'react'
import HomeLayout from '~/components/Layout/HomeLayout'
import StaffTable from './StaffTable'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffectOnce } from 'usehooks-ts'
import useStaffStore from './StaffStore'
import DefaultLayout from '~/components/Layout/DefaultLayout'

interface Props {}

const StaffList = () => {
  const navigate = useNavigate()

  const [staffs] = useStaffStore(state => [state.staffs])

  const [searchValue, setSearchValue] = React.useState<string>('')

  return (
    <DefaultLayout title="Danh sách nhân viên">
      <div className="mb-2 flex min-h-full flex-col">
        <div className="flex items-center justify-between">
          <Input.Search
            onChange={value => setSearchValue(value.target.value)}
            className="w-[25vw]"
            placeholder="Tìm kiếm gì đó ..."
          />
          <Space>
            <Button
              onClick={() => {
                navigate(`/nhan-vien/create`)
              }}
            >
              Thêm nhân viên mới
            </Button>
          </Space>
        </div>
        {/* <TabList defaultActiveKey='2' eventId={id} /> */}
        <div className="bg-bgPrimary mt-2 h-full grow rounded-lg px-2 shadow-md">
          <StaffTable
            staffs={staffs.filter(staff =>
              `${staff.firstName} ${staff.lastName}`
                .toLowerCase()
                .includes(searchValue.toLowerCase())
            )}
          />
        </div>
      </div>
    </DefaultLayout>
  )
}

export default StaffList
