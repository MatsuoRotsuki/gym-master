import React from 'react'
import DefaultLayout from '~/components/Layout/DefaultLayout'
import useGymStore from '../gym/GymStore'
import { useNavigate } from 'react-router'
import useMemberStore from '../member/MemberStore'
import useAuth from '~/hooks/useAuth'
import useEquipmentStore from '../equipment/EquipmentStore'
import useStaffStore from '../staff/StaffStore'
import { Registration, Revenue, Usage } from './Statistical'
import { Carousel, Tag } from 'antd'
import PlanThumbnail from '~/assets/plan-thumbnail.jpg'

type QuantityItemPropsType = {
  title: string
  icon: string
  quantity: number
  unit: string
  path: string
}

const QuantityItem = ({ title, icon, quantity, unit, path }: QuantityItemPropsType) => {
  const navigate = useNavigate()

  return (
    <button
      className="col-span-1 flex flex-col items-start justify-start gap-2 rounded-md border border-disabled p-4 text-start shadow-sm transition-shadow hover:shadow-xl"
      onClick={() => navigate(path)}
    >
      <div className="flex w-full items-center justify-between text-2xl font-semibold">
        <p className="">{title}</p>
        <p>{icon}</p>
      </div>

      <p className="flex flex-col items-start justify-start text-5xl font-semibold">
        {quantity}
        <span className="text-xl text-noneSelected">{unit}</span>
      </p>
    </button>
  )
}

const Overview = () => {
  const { currentUser, isStaff, isAdmin, isMember } = useAuth()
  const [rooms] = useGymStore(state => [state.rooms])
  const [equipments] = useEquipmentStore(state => [state.equipments])
  const [members] = useMemberStore(state => [state.members])
  const [staffs] = useStaffStore(state => [state.staffs])

  return (
    <DefaultLayout title="Gym master">
      {(isStaff || isAdmin) && (
        <>
          <div className="mb-4 grid grid-cols-4 gap-8">
            <QuantityItem
              title="Phòng gym"
              icon="🏦"
              quantity={Array.from(rooms.keys()).length}
              unit="phòng tập"
              path="/phong-tap"
            />

            <QuantityItem
              title="Thiết bị"
              icon="🚀"
              quantity={Array.from(equipments.keys()).length}
              unit="trang thiết bị"
              path="/thiet-bi"
            />

            <QuantityItem
              title="Hội viên"
              icon="🙍"
              quantity={Array.from(members.keys()).length}
              unit="đã đăng ký"
              path="/hoi-vien"
            />

            {isAdmin && (
              <QuantityItem
                title="Nhân viên"
                icon="🙎‍♂️"
                quantity={staffs.length}
                unit="nhân viên"
                path="/nhan-vien"
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 rounded-md border border-disabled p-2 shadow-sm">
              <p className="mb-2 text-xl font-medium">Doanh thu</p>
              <Revenue />
            </div>

            <div className="col-span-2 rounded-md border border-disabled p-2 shadow-sm">
              <p className="mb-2 text-xl font-medium">Lượt đăng ký</p>
              <Registration />
            </div>
          </div>
        </>
      )}

      {isMember && (
        <div>
          <Carousel className="max-h-[35rem] min-h-[35rem] shadow-sm" effect="fade" autoplay>
            <div>
              <img
                className="max-h-[35rem] w-full rounded-md object-cover"
                src="https://firebasestorage.googleapis.com/v0/b/gym-master-3bb8c.appspot.com/o/images%2FBRV%20Games.png?alt=media&token=ad9b0e94-c765-4dc8-9c4d-9b5a9b991d29"
              />
            </div>
            <div>
              <img
                className="max-h-[35rem] w-full rounded-md object-cover"
                src="https://firebasestorage.googleapis.com/v0/b/gym-master-3bb8c.appspot.com/o/images%2FFitness%20Girl%20Print%2C%20Motivation%20Canvas%2C%20Sport%20Canvas%20Print%2C%20Gym%20Wall%20Art%2C%20Dumbbell%20Poster%2C%20Gym%20Room%20Decor%2C%20Sportswoman%20Gift.jpg?alt=media&token=d45446d7-4695-4f4f-ba8b-2be734c60246"
              />
            </div>
            <div>
              <img
                className="max-h-[35rem] w-full rounded-md object-cover"
                src="https://firebasestorage.googleapis.com/v0/b/gym-master-3bb8c.appspot.com/o/images%2FNever%20Give%20up%20Motivational%20Wall%20Decal%20Gym%20Wall%20Decal%20Gym%20-%20Etsy.jpg?alt=media&token=56e78344-b94f-4f8e-986c-c2f8f1222fe0"
              />
            </div>
            <div>
              <img
                className="max-h-[35rem] w-full rounded-md object-cover"
                src="https://firebasestorage.googleapis.com/v0/b/gym-master-3bb8c.appspot.com/o/images%2FReforma%20Gym%20club.jpg?alt=media&token=b15a4a5b-8863-4427-bf0a-fd02449e008c"
              />
            </div>
          </Carousel>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-md border border-disabled p-2 shadow-sm">
              <p className="mb-2 text-xl font-medium">Tuần suất sử dụng tuần qua </p>
              <Usage />
            </div>

            <div className="">
              <p className="mb-2 text-xl font-medium">Gói đăng ký của tôi</p>
              <div className="grid grid-cols-4 gap-2">
                {members.get(currentUser as string)?.memberMemberships.map((plan, index) => (
                  <button
                    key={index}
                    className="w-[8rem] rounded-md border border-cartBorder text-start shadow-sm"
                  >
                    <img
                      src={PlanThumbnail}
                      alt="equipment-image"
                      className="aspect-square w-full rounded-t object-cover"
                    />

                    <div className="max-w-[15rem] p-2">
                      <p className="truncate text-sm font-semibold">{plan.membership.name}</p>
                      <p className="text-gray-500 truncate text-xs">
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND'
                        }).format(plan.membership.monthlyPrice ?? 0)}
                      </p>
                    </div>

                    {isMember && (
                      <Tag className="absolute top-2 " color="success">
                        Đã đăng ký
                      </Tag>
                    )}

                    <div className="absolute top-2 rounded-sm bg-equipmentType px-2 text-base shadow-sm"></div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  )
}

export default Overview
