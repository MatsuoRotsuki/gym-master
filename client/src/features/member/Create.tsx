import { Button, DatePicker, Form, Input, Modal, Radio, Space } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { RcFile } from 'antd/es/upload'
import React from 'react'
import dayjs from 'dayjs'
import DefaultLayout from '~/components/Layout/DefaultLayout'
import UploadImage from '~/components/UploadImage'
import useMemberStore from './MemberStore'
import { toast } from 'react-toastify'
import uploadFile from '~/firebase/uploadFile'

type UploadFile = RcFile & { preview: string }

type PropsType = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Create = ({ isOpen, setIsOpen }: PropsType) => {
  const [form] = useForm()

  const [createMember] = useMemberStore(state => [state.createMember])

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [image, setImage] = React.useState<FilePreview | { preview: string } | null>(null)

  const onFinish = async (values: any) => {
    setIsLoading(true)
    let error = false
    let imageUrl = null

    if (image) {
      imageUrl = await uploadFile(image as File)
    }

    try {
      createMember({
        ...values,
        dateOfBirth: dayjs(values.dateOfBirth).format('YYYY-MM-DD'),
        user: { email: values.email, passwordDigest: values.password },
        avatar: imageUrl
      })
      toast.success('Thêm hội viên thành công', { toastId: 'createMember-success' })
    } catch (error) {
      error = true
      toast.error('Thêm hội viên thất bại', { toastId: 'createMember-failed' })
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
      title="Thêm mới hội viên"
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
          <Button disabled={isLoading} type="primary" onClick={() => form.submit()}>
            Thêm
          </Button>
        </Space>
      }
    >
      <Form
        form={form}
        className="grid auto-rows-max grid-cols-8 items-start justify-center"
        onFinish={onFinish}
        autoComplete="off"
        labelAlign="left"
      >
        <div className="col-span-5">
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Email không được để trống' }]}
            labelCol={{ span: 8 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: 'Mật khẩu không được để trống' }]}
            labelCol={{ span: 8 }}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="repetPassword"
            label="Nhập lại"
            rules={[{ required: true, message: 'Mật khẩu không được để trống' }]}
            labelCol={{ span: 8 }}
          >
            <Input.Password />
          </Form.Item>
        </div>
        <UploadImage className="col-span-3 row-span-1 ms-2" image={image} setImage={setImage} />
        <Form.Item
          className="col-span-8"
          name="firstName"
          label="Tên họ"
          rules={[{ required: true, message: 'Họ tên không được để trống' }]}
          labelCol={{ span: 5 }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="col-span-8"
          name="lastName"
          label="Tên riêng"
          labelCol={{ span: 5 }}
          rules={[{ required: true, message: 'Họ tên không được để trống' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Ngày sinh"
          name="dateOfBirth"
          className="col-span-8"
          rules={[{ required: true, message: 'Ngày sinh không được để trống' }]}
          labelCol={{ span: 5 }}
        >
          <DatePicker
            className="w-full"
            placeholder="Ngày sinh"
            format={'YYYY-MM-DD'}
            disabledDate={current => {
              return current && current > dayjs().endOf('day')
            }}
          />
        </Form.Item>
        <Form.Item
          label="Giới tính"
          name="gender"
          className="col-span-4"
          rules={[{ required: true, message: 'Giới tính không được để trống' }]}
          labelCol={{ span: 9 }}
        >
          <Radio.Group>
            <Radio value={1}>Nam</Radio>
            <Radio value={2}>Nữ</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="SĐT"
          name="phoneNumber"
          className="col-span-4"
          rules={[{ required: true, message: 'SĐT không được để trống' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Địa chỉ"
          name="address"
          className="col-span-8"
          rules={[{ required: true, message: 'Địa chỉ không được để trống' }]}
          labelCol={{ span: 5 }}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Ghi chú" name="note" className="col-span-8" labelCol={{ span: 5 }}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Create
