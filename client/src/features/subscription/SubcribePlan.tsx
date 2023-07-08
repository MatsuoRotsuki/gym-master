import React, { useState } from 'react'
import { Button, Form, Input, InputNumber, Modal, Space, Tag, message } from 'antd'
import { CreditCardOutlined, LoadingOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import useSubscriptionStore from './SubscriptionStore'
import { useNavigate, useParams } from 'react-router'
import DefaultLayout from '~/components/Layout/DefaultLayout'
import ButtonBack from '~/components/ButtonBack'
import DetailItemWrapper from '~/components/DetailItemWrapper'
import useAuth from '~/hooks/useAuth'
import { subscribePlan } from '~/lib/subscriptionApi'

const variants = {
  hidden: { opacity: 0, y: 10 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
}

const SubscribePlan = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const quantity = Form.useWatch('quantity', form)

  const { currentUser, email } = useAuth()
  const [plans] = useSubscriptionStore(state => [state.plans])

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const plan = plans.get(id as string) as IMembership
  const isSubscribed = plan?.registrations.filter(each => each.member.id === currentUser).length > 0

  if (!id || !plan) navigate(-1)

  const handleRequestSubscribePlan = async () => {
    if (!currentUser) return

    try {
      setIsLoading(true)
      const data = await subscribePlan({
        memberId: currentUser,
        membershipId: plan.id,
        periodOfMonths: quantity
      })
      console.log('==> data', data)
      setIsSuccess(true)
    } catch (error) {
      message.error('Lỗi server, hãy thử lại sau ít phút ><!')
    } finally {
      setIsLoading(false)
    }
  }

  const onFinish = (value: any) => {}

  return (
    <DefaultLayout title={<ButtonBack />}>
      {plan && (
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-2 col-start-2 min-h-full border-r border-disabled p-2">
            <p className="mb-4 text-lg font-medium">Thông tin gói đăng ký</p>

            <DetailItemWrapper label="Tên gói đăng ký: " title={plan.name} />
            <DetailItemWrapper
              label="Mức giá: "
              title={new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
              }).format(plan.monthlyPrice ?? 0)}
            />
            <DetailItemWrapper label="Mô tả: " title={plan.description} />
          </div>

          <div className="col-span-2 p-2">
            <p className="mb-4 text-lg font-medium">
              {isSubscribed ? 'Gia hạn gói tập' : 'Đăng ký gói tập'}
            </p>

            <Form
              form={form}
              name="plan-subcribe"
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
              initialValues={{
                email: email,
                quantity: 1
              }}
            >
              <Form.Item label="Email" name="email">
                <Input disabled placeholder="Nhập tên gói tập" />
              </Form.Item>

              <Form.Item
                label="Số lượng: "
                name="quantity"
                rules={[{ required: true, message: 'Số lượng không được để trống' }]}
              >
                <InputNumber disabled={isSuccess} max={3} min={1} placeholder="Nhập số lượng" />
              </Form.Item>

              <p className="mb-4 text-lg font-medium">Phương thức thanh toán</p>

              <button
                className={`mb-2 flex w-[10rem] flex-col items-start justify-center gap-1 rounded-md border border-disabled p-2 px-4 font-medium shadow-sm transition-colors ${
                  isSuccess && 'border-primary-4 text-primary-4'
                }`}
                disabled={isLoading}
                onClick={handleRequestSubscribePlan}
              >
                {isLoading ? (
                  <LoadingOutlined className="justity-center flex items-center" />
                ) : (
                  <CreditCardOutlined className="justity-center flex items-center text-lg" />
                )}
                <p>Thẻ tín dụng</p>
              </button>

              {isSuccess && (
                <motion.div
                  variants={variants}
                  initial="hidden"
                  animate="enter"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <p className="py-2 text-xl font-medium">
                    <span className="text-base text-noneSelected">Số tiền thanh toán: </span>
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND'
                    }).format(plan.monthlyPrice * quantity ?? 0)}
                  </p>
                  <Form.Item
                    label="Thông tin thẻ tín dụng"
                    name="cardInfo"
                    rules={[{ required: true, message: 'Số thẻ không được để trống' }]}
                  >
                    <Input max={3} min={1} placeholder="1234 1234 1234 1234" />
                  </Form.Item>
                  <Button
                    className="w-full"
                    type="primary"
                    ghost
                    htmlType="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <LoadingOutlined className="justity-center flex items-center" />
                    ) : (
                      'Xác nhận thanh toán'
                    )}
                  </Button>
                </motion.div>
              )}
            </Form>
          </div>
        </div>
      )}
    </DefaultLayout>
  )
}

export default SubscribePlan
