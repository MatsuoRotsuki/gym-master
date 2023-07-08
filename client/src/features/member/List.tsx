import React, { useEffect } from 'react'
import DefaultLayout from '~/components/Layout/DefaultLayout'
import useMemberStore from './MemberStore'
import { Avatar, Button, Pagination, Space, Tag } from 'antd'
import MemberCard from './MemberCard'
import Detail from './Detail'
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons'
import Create from './Create'

const List = () => {
  const [members, { page: currentPage, offset }, setCurrentPage] = useMemberStore(state => [
    state.members,
    state.currentPage,
    state.setCurrentPage
  ])

  const [currentMember, setCurrentMember] = React.useState<IMember>({} as IMember)

  const [searchValue, setSearchValue] = React.useState<string>('')

  const [isCreateOpen, setIsCreateOpen] = React.useState<boolean>(false)

  useEffect(() => {
    if (Object.keys(currentMember).length > 0)
      setCurrentMember(members.get(currentMember?.id) as IMember)
    console.log('Thay doi members')
  }, [members])

  return (
    <DefaultLayout title="Danh sách hội viên" style="p-0">
      <div className="flex flex-grow">
        <div className="flex items-start">
          <div
            className="w-[400px] border-r-2"
            style={{ borderColor: 'rgb(148 163 184)', height: 'calc(100vh - 48px)' }}
          >
            <Space className="flex items-center justify-between p-2">
              <p className="text-xl font-medium">
                <span className="text-3xl">{Array.from(members.values()).length}</span> hội viên
              </p>
              <Button type="primary" ghost onClick={() => setIsCreateOpen(true)}>
                Thêm hội viên
              </Button>
            </Space>
            <div className="flex items-center justify-center gap-1 border-b border-disabled px-3 py-1">
              <SearchOutlined className="text-textHover" />
              <input
                className="grow text-base outline-none"
                placeholder="Tìm kiếm theo tên"
                onChange={event => {
                  setCurrentPage({ page: 1, offset })
                  setSearchValue(event.target.value)
                }}
              />
            </div>
            {Array.from(members.values())
              .filter(item =>
                `${item.firstName} ${item.lastName}`
                  .toLowerCase()
                  .includes(searchValue.toLowerCase())
              )
              .slice((currentPage - 1) * offset, currentPage * offset)
              .map((member, index) => (
                <MemberCard
                  key={index}
                  member={member}
                  setCurrentMember={setCurrentMember}
                  className={member.id === currentMember.id ? 'bg-bgSecondary' : ''}
                />
              ))}
            {Array.from(members.values()).length === 0 && <LoadingOutlined />}
            <Pagination
              simple
              className="mb-2 mt-1 flex items-center justify-center"
              defaultPageSize={offset ?? 6}
              total={
                Array.from(members.values()).filter(item =>
                  `${item.firstName} ${item.lastName}`
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
                ).length
              }
              current={currentPage}
              onChange={(page, pageSize) => setCurrentPage({ page, offset: pageSize })}
            />
          </div>
        </div>
        <Detail member={currentMember} />
        <Create isOpen={isCreateOpen} setIsOpen={setIsCreateOpen} />
      </div>
    </DefaultLayout>
  )
}

export default List
