import { ExclamationCircleFilled, LoadingOutlined } from '@ant-design/icons'
import { Button, DatePicker, Form, Input, InputNumber, Radio, Space } from 'antd'
import Password from 'antd/es/input/Password'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { showDeleteConfirm } from '~/components/Layout/ConfirmModal'
import DefaultLayout from '~/components/Layout/DefaultLayout'
import SubHeader from '~/components/Layout/SubHeader'
import useStaffStore from './StaffStore'
import { useEffectOnce } from 'usehooks-ts'
import moment from 'moment'
import { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import axiosClient from '~/lib/axiosClient'
import uploadFile from '~/firebase/uploadFile'
import UploadImage from '~/components/UploadImage'
import dayjs from 'dayjs'

const Edit = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const [image, setImage] = useState<FilePreview | { preview: string } | null>(null)
  const [staff, getStaffById] = useStaffStore(state => [state.staff, state.getStaffById])
  useEffectOnce(() => {
    getStaffById(id)
  })
  useEffect(() => {
    form.setFieldsValue({
      ...staff,
      hiredDate: dayjs(staff.hiredDate),
      dateOfBirth: dayjs(staff.dateOfBirth)
    })
  }, [form, staff])
  const onFinish = async (values: any) => {
    setLoading(true)
    const ngaySinhDate = new Date(values.dateOfBirth)
    const formattedngaySinhDate = moment(ngaySinhDate).format('YYYY-MM-DD')
    const hiredDate = new Date(values.hiredDate)
    const formattedHiredDate = moment(hiredDate).format('YYYY-MM-DD')
    let imageUrl: string | undefined = undefined
    if (image) imageUrl = await uploadFile(image as File)
    const request = {
      avatar: imageUrl,
      position: values.position,
      note: values.note,
      hiredDate: formattedHiredDate,
      employmentStatus: values.employmentStatus,
      salary: values.salary,
      firstName: values.firstName,
      lastName: values.lastName,
      gender: values.gender,
      dateOfBirth: formattedngaySinhDate,
      // email: values.email,
      address: values.address,
      phoneNumber: values.phoneNumber
    }
    try {
      const response: AxiosResponse = await axiosClient.put(`/staffs/${id}`, request)
      form.resetFields()
      setTimeout(() => {
        toast.success('Cập nhật nhân viên thành công', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
          toastId: 'add-staff-success'
        })
      }, 200)
      navigate(`/nhan-vien`)
    } catch (error) {
      const axiosError = error as AxiosError
      const dataError: { error: string } | unknown = axiosError.response?.data
      const dataError2 = dataError as { error: string }
      const messageError = dataError2.error
      toast.error(messageError ?? error, {
        position: toast.POSITION.TOP_RIGHT
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <DefaultLayout>
      <div className="bg-bgPrimary min-h-full w-full rounded-lg px-4 py-2 shadow-md">
        <SubHeader title={`Chỉnh sửa nhân viên`} type="create" />
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          title="Thêm nhân viên"
          initialValues={{ modifier: 'public' }}
          className="grid auto-rows-max grid-cols-8"
          onFinish={onFinish}
        >
          <div className="col-span-6 col-start-1">
            <Form.Item
              name="firstName"
              label="First Name"
              labelCol={{ span: 8 }}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="lastName"
              label="Last Name"
              labelCol={{ span: 8 }}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="gender"
              label="Giới tính"
              labelCol={{ span: 8 }}
              rules={[{ required: true }]}
            >
              <Radio.Group>
                {['Nam', 'Nữ'].map((gender, index) => (
                  <Radio value={index} key={index}>
                    {gender}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="dateOfBirth"
              label="Ngày sinh"
              labelCol={{ span: 8 }}
              rules={[{ required: true }]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              name="address"
              label="Địa chỉ"
              labelCol={{ span: 8 }}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              label="Điện thoại"
              labelCol={{ span: 8 }}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            {/* <Form.Item
              name={["user", "role"]}
              label=""
              labelCol={{ span: 8 }}
              rules={[{ required: true }]}
              initialValue={2}
              //hidden
            >
              <InputNumber defaultValue={2}/>
            </Form.Item> */}
            <Form.Item
              name="position"
              label="Vị trí"
              labelCol={{ span: 8 }}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="note" label="Ghi chú" labelCol={{ span: 8 }}>
              <Input />
            </Form.Item>
            <Form.Item
              name="hiredDate"
              label="Ngày tuyển dụng"
              labelCol={{ span: 8 }}
              rules={[{ required: true }]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              name="employmentStatus"
              label="Trạng thái làm việc"
              labelCol={{ span: 8 }}
              rules={[{ required: true }]}
            >
              <Radio.Group>
                {['Đang làm', 'Không còn làm'].map((status, index) => (
                  <Radio value={index + 1} key={index + 1}>
                    {status}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="salary"
              label="Lương"
              labelCol={{ span: 8 }}
              rules={[{ required: true }]}
            >
              <InputNumber addonAfter="vnd" />
            </Form.Item>
            <Form.Item name={['user', 'avatar']} label="Ảnh đại diện">
              <UploadImage image={image} setImage={setImage} />
            </Form.Item>
            <Form.Item name={['user', 'avatar']} label="Ảnh đại diện">
              <UploadImage image={image} setImage={setImage} />
            </Form.Item>
          </div>
          <Form.Item className="col-span-8 col-start-6 ms-32">
            <Space>
              <Button
                type="primary"
                htmlType="button"
                className="bg-danger"
                onClick={() =>
                  showDeleteConfirm({
                    title: 'Bạn có chắc chắn muốn hủy quá trình ?',
                    icon: <ExclamationCircleFilled />,
                    onOk() {
                      navigate(-1)
                    }
                  })
                }
              >
                Hủy
              </Button>
              <Button disabled={loading} type="primary" htmlType="submit" ghost>
                {loading ? <LoadingOutlined /> : 'Tạo'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </DefaultLayout>
  )
}

export default Edit
