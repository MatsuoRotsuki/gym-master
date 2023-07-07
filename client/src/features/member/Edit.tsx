import { Button, Checkbox, Form, Input, Modal, Space } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React, { useEffect } from 'react'
import DefaultLayout from '~/components/Layout/DefaultLayout'
import useMemberStore from './MemberStore'

type PropsType = {
  member: IMember
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Edit = ({ member, isOpen, setIsOpen }: PropsType) => {
  const [form] = useForm()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const [isBanned, setIsBanned] = React.useState<boolean>(member.isBanned as boolean)

  const [updateMember] = useMemberStore(state => [state.updateMember])

  const onFinish = async (values: any) => {
    setIsLoading(true)
    member = { ...member, ...values, isBanned }
    let error = false
    try {
      updateMember(member)
    } catch (error) {
      error = true
      console.log('Lỗi r bé ơi', error)
    } finally {
      setIsLoading(false)
      if (!error) setIsOpen(false)
    }
  }

  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      title={
        <div className="flex items-center justify-start gap-4">
          <p>Chỉnh sửa thông tin hội viên</p>
          <Checkbox
            className="w-1/3 font-thin"
            checked={isBanned}
            onChange={() => setIsBanned(!isBanned)}
          >
            Khóa tài khoản
          </Checkbox>
        </div>
      }
      footer={
        <Space>
          <Button
            onClick={() => {
              setIsOpen(false)
              form.resetFields()
              setIsBanned(member.isBanned ?? false)
            }}
          >
            Hủy
          </Button>
          <Button
            disabled={isLoading}
            htmlType="submit"
            ghost
            type="primary"
            onClick={() => form.submit()}
          >
            Lưu
          </Button>
        </Space>
      }
    >
      <Form
        form={form}
        initialValues={{
          ...member
        }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <div className="grid grid-cols-2 gap-2">
          <Form.Item
            className="w-full"
            label="Tên họ"
            name="lastName"
            rules={[{ required: true, message: 'Tên họ không được để trống' }]}
          >
            <Input placeholder="Nhập tên họ" />
          </Form.Item>

          <Form.Item
            className="w-full"
            label="Tên riêng"
            name="firstName"
            rules={[{ required: true, message: 'Tên riêng không được để trống' }]}
          >
            <Input placeholder="Nhập tên riêng" />
          </Form.Item>
        </div>

        <Form.Item label="Cân nặng" name="weight">
          <Input placeholder="Nhập cân nặng" />
        </Form.Item>

        <Form.Item label="Trình trạng sức khỏe" name="healthCondition">
          <Input placeholder="Nhập trình trạng sức khỏe" />
        </Form.Item>

        <Form.Item label="Ghi chú" name="note">
          <Input placeholder="Ghi chú" />
        </Form.Item>

        {isBanned && (
          <Form.Item
            label="Lý do khóa"
            name="bannedReason"
            rules={[{ required: true, message: 'Phải nhập lý do xóa' }]}
          >
            <Input placeholder="Phá hoại thiết bị, Lười, ..." />
          </Form.Item>
        )}
      </Form>
    </Modal>
  )
}

export default Edit
