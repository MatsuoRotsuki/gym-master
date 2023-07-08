import { Button, Form, Input, Modal, Space, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { RcFile } from 'antd/es/upload'
import { AxiosError } from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import DefaultLayout from '~/components/Layout/DefaultLayout'
import UploadImage from '~/components/UploadImage'
import uploadFile from '~/firebase/uploadFile'
import axiosClient from '~/lib/axiosClient'

type PropsType = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Create = ({ isOpen, setIsOpen }: PropsType) => {
  const [form] = useForm()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [image, setImage] = useState<FilePreview | { preview: string } | null>(null)

  const onFinish = async (values: any) => {
    setIsLoading(true)
    try {
      let imageUrl: string | undefined = undefined
      if (image) imageUrl = await uploadFile(image as File)
      await axiosClient.post(`/gyms`, {
        ...values,
        // image: imageUrl,
        image: null
      })
      form.resetFields()
      message.success('Thêm mới nhân viên thành công')
      setIsOpen(false)
    } catch (error) {
      message.error('Lỗi khi tạo ><!')
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
      centered
      footer={
        <Space>
          <Button
            type="primary"
            ghost
            danger
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
      <Form form={form} onFinish={onFinish} autoComplete="off" layout="vertical">
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

        {/* <Form.Item
          className="w-full"
          label="Tên phòng tập"
          name="name"
          rules={[{ required: true, message: 'Tên phòng tập không được để trống' }]}
        >
          <Input placeholder="Nhập tên phòng tập" />
        </Form.Item> */}
        <Form.Item name="image" label="Ảnh minh họa">
          <UploadImage image={image} setImage={setImage} />
        </Form.Item>
      </Form>
      <ToastContainer />
    </Modal>
  )
}

export default Create
