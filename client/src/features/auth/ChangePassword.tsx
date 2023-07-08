import React, { useState } from 'react'
import { Button, Form, Input, Modal, Space } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

type PropsType = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ChangePassword = ({ isOpen, setIsOpen }: PropsType) => {
  const [form] = Form.useForm()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onFinish = (value: any) => {}

  return (
    <Modal
      title="Đổi mật khẩu"
      open={isOpen}
      onOk={() => setIsOpen(false)}
      onCancel={() => setIsOpen(false)}
      width={480}
      footer={[<></>]}
      centered
    >
      <Form
        form={form}
        name="change-password"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Mật khẩu cũ"
          name="oldPwd"
          rules={[{ required: true, message: 'Mật khẩu cũ không được để trống' }]}
        >
          <Input placeholder="Nhập mật khẩu cũ" />
        </Form.Item>

        <Form.Item
          label="Mật khẩu mới"
          name="newPwd"
          rules={[{ required: true, message: 'Mật khẩu mới không được để trống' }]}
        >
          <Input.Password placeholder="Nhập mật khẩu mới" />
        </Form.Item>

        <Form.Item
          label="Xác nhận mật khẩu mới"
          name="newPwdConfirm"
          rules={[{ required: true, message: 'Xác nhận mật khẩu mới không được để trống' }]}
        >
          <Input.Password placeholder="Nhập xác nhận mật khẩu mới" />
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

export default ChangePassword
