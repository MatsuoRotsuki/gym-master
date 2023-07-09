import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { LoadingOutlined } from '@ant-design/icons'
import axiosClient from '~/lib/axiosClient'
import { toast } from 'react-toastify'
import Feedback from './Feedback'
import { Button, Form, Input, Modal, Rate } from 'antd'
import AddEquipment from './AddEquipment'
import GymEquipmentItem from './GymEquiomentItem'
import { customIcons } from '../feedback/List'
import useAuth from '~/hooks/useAuth'

type GymInfoItemProps = {
  label: string
  value?: React.ReactNode
}

type EachGymInfoDivProps = {
  label: React.ReactNode
  className?: string
  children: React.ReactNode
}

type PropsType = {
  room: IGym
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  staff: IStaff
}

const GymInfoItem = ({ label, value }: GymInfoItemProps) => {
  return (
    <div>
      <p className="text-medium mb-1 text-base text-noneSelected">{label}</p>
      <p className={`text-base`}>{value ?? <span className="text-unknow">Chưa cập nhật</span>}</p>
    </div>
  )
}

const EachGymInfoDiv = ({ label, className, children }: EachGymInfoDivProps) => {
  return (
    <div className={`mb-2 rounded-md border border-disabled p-2 ${className}`}>
      <p className="mb-2 text-lg font-medium">{label}</p>
      {children}
    </div>
  )
}

const Detail = ({ isOpen, setIsOpen, room, staff }: PropsType) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const { isAdmin, isStaff, isMember } = useAuth()
  const [addEquipment, setAddEquipment] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const totalStars = room.feedbacks.reduce((total, feedback) => total + feedback.stars, 0)
  const avgStars = Number((totalStars / room.feedbacks.length).toFixed(2))

  const onFinishFeedback = async (values: IFeedback) => {
    setIsLoading(true)
    try {
      await axiosClient.post(`/members/1/gyms/${room.id}/feedbacks`, {
        ...values
      })
      form.resetFields()
      setTimeout(() => {
        toast.success('Thêm feedback thành công', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
          toastId: 'edit-gym-success'
        })
      }, 200)
      // navigate(`/phong-tap`)
      window.location.reload()
    } catch (error) {
      toast.error('Lỗi khi tạo feedback', {
        position: toast.POSITION.TOP_RIGHT
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      onOk={() => {
        setIsOpen(false)
      }}
      footer={[<></>]}
      centered
      width={1000}
    >
      <div className="bg-bgPrimary h-full w-full">
        {!room ? (
          <div className="flex w-full items-center justify-center">
            <LoadingOutlined className="text-primary text-4xl" />
          </div>
        ) : (
          <>
            <EachGymInfoDiv label={`Mã phòng tập - ${room.id}`}>
              <div className="flex items-center justify-start gap-8">
                <div className="grid h-full grow grid-cols-3 gap-4">
                  <GymInfoItem label="Tên phòng tập" value={`${room.name}`} />
                  <GymInfoItem label="Địa chỉ" value={`${room.address}`} />

                  <GymInfoItem label="Địa chỉ email" value={room.email} />
                  <GymInfoItem label="Số điện thoại" value={room.hotline} />
                  <GymInfoItem
                    label="Đánh giá"
                    value={
                      <>
                        <Rate
                          defaultValue={avgStars}
                          disabled
                          character={({ index }: any) => customIcons[index + 1]}
                        />{' '}
                        {avgStars}
                      </>
                    }
                  />
                </div>
              </div>
            </EachGymInfoDiv>
            <EachGymInfoDiv label={`Danh sách dụng cụ`}>
              {!room.equipments ? (
                <div className="flex w-full items-center justify-center">
                  <LoadingOutlined className="text-primary text-4xl" />
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-4 gap-4 p-8">
                    {room.equipments?.map((equipment, index) => (
                      <GymEquipmentItem key={index} equipment={equipment} room={room} />
                    ))}
                  </div>

                  {(isAdmin || isStaff) && (
                    <>
                      <Button
                        type="primary"
                        ghost
                        onClick={() => {
                          setAddEquipment(true)
                        }}
                      >
                        Thêm trang thiết bị
                      </Button>
                      <AddEquipment room={room} isOpen={addEquipment} setIsOpen={setAddEquipment} />
                    </>
                  )}
                </>
              )}
            </EachGymInfoDiv>

            <EachGymInfoDiv label={`Các phản hồi của khách hàng`}>
              {room.feedbacks ? (
                <Feedback feedbacks={room.feedbacks} staff={staff} />
              ) : (
                <div className="flex w-full items-center justify-center">
                  <LoadingOutlined className="text-primary text-4xl" />
                </div>
              )}

              {isMember && (
                <Form form={form} onFinish={onFinishFeedback} autoComplete="off" layout="vertical">
                  <Form.Item
                    className="w-full"
                    label="Gửi feedback"
                    name="content"
                    rules={[{ required: true, message: 'Hãy nhập feedback' }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    className="w-full"
                    label="Đánh giá"
                    name="stars"
                    rules={[{ required: true, message: 'Hãy đánh giá' }]}
                  >
                    <Rate allowHalf character={({ index }: any) => customIcons[index + 1]} />
                  </Form.Item>
                  <Form.Item>
                    <Button disabled={isLoading} type="primary" htmlType="submit" ghost>
                      {isLoading ? <LoadingOutlined /> : 'Thêm Feedback'}
                    </Button>
                  </Form.Item>
                </Form>
              )}
            </EachGymInfoDiv>
          </>
        )}
      </div>
    </Modal>
  )
}

export default Detail
