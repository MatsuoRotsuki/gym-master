import React from 'react'
import DefaultLayout from '~/components/Layout/DefaultLayout'
import useMemberStore from './MemberStore'
import MemberCard from './MemberCard'
import { Pagination } from 'antd'

const List = () => {
  const [members, { page: currentPage, offset }, setCurrentPage] = useMemberStore(state => [
    state.members,
    state.currentPage,
    state.setCurrentPage
  ])

  return (
    <DefaultLayout title="Danh sách hội viên">
      <div className="grid grid-cols-4 gap-4">
        {Array.from(members.values())
          .slice((currentPage - 1) * offset, currentPage * offset)
          .map((member, index) => (
            <MemberCard key={index} member={member} />
          ))}
      </div>
      <Pagination
        className="mt-4 flex items-center justify-end"
        defaultCurrent={currentPage ?? 1}
        defaultPageSize={offset ?? 8}
        pageSizeOptions={['8', '12', '24']}
        total={Array.from(members.keys()).length}
        onChange={(page, pageSize) => setCurrentPage({ page, offset: pageSize })}
      />
    </DefaultLayout>
  )
}

export default List
