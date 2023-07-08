import { LoadingOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber, Modal, Space, message } from 'antd'
import React, { useState } from 'react'
import DefaultLayout from '~/components/Layout/DefaultLayout'
import useSubscriptionStore from './SubscriptionStore'
import useAuth from '~/hooks/useAuth'

type PropsType = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Create = ({ isOpen, setIsOpen }: PropsType) => {
  const [form] = Form.useForm()

  const { currentUser } = useAuth()
  const [addNewPlan] = useSubscriptionStore(state => [state.addNewPlan])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onFinish = async (values: IMembership) => {
    if (!currentUser) return
    setIsLoading(true)

    addNewPlan(currentUser, { ...values })
      .then(() => {
        setIsOpen(false)
        message.open({
          type: 'success',
          content: 'Thêm mới gói đăng ký thành công !'
        })
        form.resetFields()
      })
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false))
  }

  return (
    <Modal
      title="Thêm thiết gói tập mới"
      open={isOpen}
      onOk={() => setIsOpen(false)}
      onCancel={() => setIsOpen(false)}
      width={680}
      footer={[<></>]}
      centered
    >
      <Form
        form={form}
        name="add-equipment"
        onFinish={onFinish}
        autoComplete="off"
        labelCol={{ span: 6 }}
        className="custom-scroll-bar max-h-[75vh] overflow-y-auto pe-1"
      >
        <Form.Item
          label="Tên gói tập"
          name="name"
          rules={[{ required: true, message: 'Tên gói tập không được để trống' }]}
        >
          <Input placeholder="Nhập tên gói tập" />
        </Form.Item>

        <Form.Item
          label="Mức giá"
          name="monthlyPrice"
          rules={[{ required: true, message: 'Mức giá không được để trống' }]}
        >
          <InputNumber min={100000} placeholder="0 đ" />
        </Form.Item>

        <Form.Item
          label="Số lượng tối đa"
          name="maxNumOfMembers"
          rules={[{ required: true, message: 'Số lượng tối đa không được để trống' }]}
        >
          <InputNumber max={50} placeholder="0" />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: 'Mô tả không được để trống' }]}
        >
          <Input.TextArea placeholder="Mô tả về gói tập" />
        </Form.Item>

        <Space className="flex justify-end">
          <Button
            type="primary"
            ghost
            danger
            htmlType="button"
            onClick={() => {
              form.resetFields()
              setIsOpen(false)
            }}
          >
            Hủy
          </Button>
          <Button type="primary" ghost htmlType="submit" disabled={isLoading}>
            {isLoading ? <LoadingOutlined className="justity-center flex items-center" /> : 'Thêm'}
          </Button>
        </Space>
      </Form>
    </Modal>
  )
}

export default Create
