import React from 'react'
import DefaultLayout from '~/components/Layout/DefaultLayout'
import useEquipmentStore from './EquipmentStore'
import ItemCard from './ItemCard'
import { Pagination } from 'antd'
import ListNavBar from './ListNavBar'

const List = () => {
  const [equipments, { page: currentPage, offset }, setCurrentPage] = useEquipmentStore(state => [
    state.equipments,
    state.currentPage,
    state.setCurrentPage
  ])
  return (
    <DefaultLayout title="Danh sách phòng tập">
      <ListNavBar quantity={Array.from(equipments.keys()).length} />

      <>
        <div className="grid h-full w-full grid-cols-4 gap-4">
          {Array.from(equipments.values())
            .reverse()
            .slice((currentPage - 1) * offset, currentPage * offset)
            .map((equipment, index) => (
              <ItemCard key={`equipments-list-${equipment.id}-${index}`} equipment={equipment} />
            ))}
        </div>
      </>

      <Pagination
        className="mt-4 flex items-center justify-end"
        defaultCurrent={currentPage ?? 1}
        defaultPageSize={offset ?? 12}
        pageSizeOptions={['12', '24', '36']}
        total={Array.from(equipments.keys()).length}
        onChange={(page, pageSize) => setCurrentPage({ page, offset: pageSize })}
      />
    </DefaultLayout>
  )
}

export default List
