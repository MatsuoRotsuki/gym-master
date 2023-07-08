import React, { useState } from 'react'
import { Button, Form, Input, Modal, Space } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

type PropsType = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  isSubcribed: boolean
  plan: IMembership
}

const SubcribePlan = ({ isOpen, setIsOpen, isSubcribed, plan }: PropsType) => {
  const [form] = Form.useForm()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onFinish = (value: any) => {}

  return (
    <Modal
      title={isSubcribed ? 'Gia hạn gói tập' : 'Đăng ký gói tập'}
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
        initialValues={{
          name: plan.name
        }}
        className="custom-scroll-bar max-h-[75vh] overflow-y-auto pe-1"
      >
        <Form.Item
          label="Tên gói tập"
          name="name"
          rules={[{ required: true, message: 'Tên gói tập không được để trống' }]}
        >
          <Input disabled placeholder="Nhập tên gói tập" value={plan.name} />
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
            {isLoading ? (
              <LoadingOutlined className="justity-center flex items-center" />
            ) : (
              'Đăng ký'
            )}
          </Button>
        </Space>
      </Form>
    </Modal>
  )
}

export default SubcribePlan
