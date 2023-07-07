import React, { useEffect } from 'react'
import DefaultLayout from '~/components/Layout/DefaultLayout'
import useMemberStore from './MemberStore'
import { Avatar, Pagination, Tag } from 'antd'
import MemberCard from './MemberCard'
import Detail from './Detail'
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons'

const List = () => {
  const [members, { page: currentPage, offset }, setCurrentPage] = useMemberStore(state => [
    state.members,
    state.currentPage,
    state.setCurrentPage
  ])

  const [currentMember, setCurrentMember] = React.useState<IMember>({} as IMember)

  const [memberSearch, setMemberSearch] = React.useState<IMember[]>([
    ...Array.from(members.values())
  ])

  useEffect(() => {
    setMemberSearch(Array.from(members.values()))
    if (Object.keys(currentMember).length)
      setCurrentMember(members.get(currentMember.id) as IMember)
  }, [members])

  return (
    <DefaultLayout title="Danh sách hội viên" style="p-0">
      <div className="flex flex-grow">
        <div className="flex items-start">
          <div
            className="w-[400px] border-r-2"
            style={{ borderColor: 'rgb(148 163 184)', height: 'calc(100vh - 48px)' }}
          >
            <div className="flex items-center justify-center gap-1 border-b border-disabled px-3 py-1">
              <SearchOutlined className="text-textHover" />
              <input
                className="grow text-base outline-none"
                placeholder="Tìm kiếm theo tên"
                onChange={event => {
                  setCurrentPage({ page: 1, offset })
                  setMemberSearch(
                    Array.from(members.values()).filter((member: IMember) =>
                      `${member.firstName} ${member.lastName}`
                        .toLowerCase()
                        .includes(event.target.value.toLowerCase())
                    )
                  )
                }}
              />
            </div>
            {memberSearch
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
              className="mt-3 flex items-center justify-center"
              defaultPageSize={offset ?? 6}
              total={memberSearch.length}
              current={currentPage}
              onChange={(page, pageSize) => setCurrentPage({ page, offset: pageSize })}
            />
          </div>
        </div>
        <Detail member={currentMember} />
      </div>
    </DefaultLayout>
  )
}

export default List
