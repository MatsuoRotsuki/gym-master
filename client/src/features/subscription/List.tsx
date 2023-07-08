import React from 'react'
import DefaultLayout from '~/components/Layout/DefaultLayout'
import useSubscriptionStore from './SubscriptionStore'
import ItemPlan from './ItemPlan'
import { Pagination } from 'antd'
import ListNavBar from './ListNavBar'
import useAuth from '~/hooks/useAuth'

const List = () => {
  const { isStaff, isAdmin } = useAuth()
  const [plans, { page: currentPage, offset }, setCurrentPage] = useSubscriptionStore(state => [
    state.plans,
    state.currentPage,
    state.setCurrentPage
  ])

  return (
    <DefaultLayout title="Gói đăng ký hiện có">
      {(isStaff || isAdmin) && <ListNavBar quantity={Array.from(plans.keys()).length} />}

      <div className="grid h-full w-full grid-cols-4 gap-4">
        {Array.from(plans.values())
          .reverse()
          .slice((currentPage - 1) * offset, currentPage * offset)
          .map((plan, index) => (
            <ItemPlan key={`plans-list-${plan.id}-${index}`} plan={plan} />
          ))}
      </div>

      {Array.from(plans.keys()).length > 12 && (
        <Pagination
          className="mt-4 flex items-center justify-end"
          defaultCurrent={currentPage ?? 1}
          defaultPageSize={offset ?? 12}
          pageSizeOptions={['12', '24', '36']}
          total={Array.from(plans.keys()).length}
          onChange={(page, pageSize) => setCurrentPage({ page, offset: pageSize })}
        />
      )}
    </DefaultLayout>
  )
}

export default List
