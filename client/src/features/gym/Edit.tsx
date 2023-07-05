import { Button, Form, Input, Modal, Space } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { AxiosError } from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import DefaultLayout from '~/components/Layout/DefaultLayout'
import axiosClient from '~/lib/axiosClient'

type PropsType = {
  room: IGym
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const Edit = ({ isOpen, setIsOpen, room }: PropsType) => {
  const [form] = useForm()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const navigate = useNavigate()

  const onFinish = async (values: any) => {
    setIsLoading(true)
    try {
      await axiosClient.put(`/gyms/${room.id}`, {
        ...values,
        image: null
      })
      form.resetFields()
      setTimeout(() => {
        toast.success('Cập nhật nhân viên thành công', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
          toastId: 'edit-gym-success'
        })
      }, 200)
      navigate(`/phong-tap`)
      window.location.reload()
    } catch (error) {
      const axiosError = error as AxiosError
      const dataError: { error: string } | unknown = axiosError.response?.data
      const dataError2 = dataError as { error: string }
      const messageError = dataError2.error
      toast.error(messageError ?? error, {
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
      title={
        <div className="flex items-center justify-start gap-4">
          <p>Chỉnh sửa thông tin phòng tập</p>
        </div>
      }
      footer={
        <Space>
          <Button
            onClick={() => {
              setIsOpen(false)
              form.resetFields()
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
          ...room
        }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          className="w-full"
          label="Tên phòng tập"
          name="name"
          rules={[{ required: true, message: 'Tên phòng tập không được để trống' }]}
        >
          <Input placeholder="Nhập tên phòng tập" />
        </Form.Item>

        <Form.Item
          className="w-full"
          label="Địa chỉ"
          name="address"
          rules={[{ required: true, message: 'Địa chỉ không được để trống' }]}
        >
          <Input placeholder="Nhập địa chỉ phòng tập" />
        </Form.Item>

        <Form.Item
          className="w-full"
          label="Số điện thoại"
          name="hotline"
          rules={[{ required: true, message: 'Số điện thoại không được để trống' }]}
        >
          <Input placeholder="Số điện thoại phòng tập" />
        </Form.Item>

        <Form.Item
          className="w-full"
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Email không được để trống' }]}
        >
          <Input placeholder="Nhập email phòng tập" />
        </Form.Item>

        <Form.Item
          className="w-full"
          label="Tên phòng tập"
          name="name"
          rules={[{ required: true, message: 'Tên phòng tập không được để trống' }]}
        >
          <Input placeholder="Nhập tên phòng tập" />
        </Form.Item>
      </Form>
      <ToastContainer />
    </Modal>
  )
}

export default Edit
