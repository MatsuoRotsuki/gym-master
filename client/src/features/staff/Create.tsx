import { ExclamationCircleFilled, LoadingOutlined } from '@ant-design/icons'
import { Button, DatePicker, Form, Input, InputNumber, Radio, Space } from 'antd'
import { useForm } from 'antd/es/form/Form'
import image from 'antd/es/image'
import Password from 'antd/es/input/Password'
import { AxiosError, AxiosResponse } from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { showDeleteConfirm } from '~/components/Layout/ConfirmModal'
import DefaultLayout from '~/components/Layout/DefaultLayout'
import SubHeader from '~/components/Layout/SubHeader'
import uploadFile from '~/firebase/uploadFile'
import axiosClient from '~/lib/axiosClient'
import moment from 'moment'
import { log } from 'console'

const genderType = ["Nam", "Nữ"]

const Create = () => {
  const [form] = useForm()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const onFinish = async (values: any) => {
    setLoading(true)
    const ngaySinhDate = new Date(values.user.dateOfBirth)
    const formattedngaySinhDate = moment(ngaySinhDate).format('YYYY-MM-DD')
    const hiredDate = new Date(values.hiredDate)
    const formattedHiredDate = moment(hiredDate).format('YYYY-MM-DD')
    try {
      const request =  {
        ...values,
        note: values.note ?? null,
        hiredDate: formattedHiredDate,
        ...values.user,
        dateOfBirth: formattedngaySinhDate,
        user: {
          ...values.user,
          dateOfBirth: formattedngaySinhDate
        }
      }
      console.log(request)
      const response: AxiosResponse = await axiosClient.post(
        `/staffs`,
       request
      )
      form.resetFields()
      setTimeout(() => {
        toast.success('Thêm nhân viên thành công', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
          toastId: 'add-children-success'
        })
      }, 200)
      navigate(`/nhan-vien`)
    } catch (error) {
      const axiosError = error as AxiosError
      const dataError: { success: boolean; message: string } | unknown = axiosError.response?.data
      const dataError2 = dataError as { success: boolean; message: string }
      const messageError = dataError2.message
      toast.error(messageError, {
        position: toast.POSITION.TOP_RIGHT
      })
    } finally {
      setLoading(false)
    }
  }
  return (
    <DefaultLayout>
       <div className="min-h-full w-full rounded-lg bg-bgPrimary px-4 py-2 shadow-md">
       <SubHeader title={`Thêm nhân viên`} type="create" />
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
            <div className='flex flex-row'>
              <Form.Item
                name={["user", "firstName"]}
                label="First Name"
                labelCol={{ span: 8 }}
                rules={[{ required: true}]}
                className='me-auto'
                style={{width: 200}}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={["user", "lastName"]}
                label="Last Name"
                labelCol={{ span: 8 }}
                rules={[{ required: true }]}
                style={{width: 200}}
              >
                <Input />
              </Form.Item>
            </div>
            <Form.Item
              name={["user", "email"]}
              label="Email"
              labelCol={{ span: 8 }}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["user", "passwordDigest"]}
              label="Mật khẩu"
              labelCol={{ span: 8 }}
              rules={[{ required: true }]}
            >
              <Password />
            </Form.Item>
            <Form.Item
              name={["user", "gender"]}
              label="Giới tính"
              labelCol={{ span: 8 }}
              rules={[{ required: true }]}
            >
              <Radio.Group>
                    {genderType.map((gender, index) => (
                      <Radio value={index} key={index}>
                        {gender}
                      </Radio>
                    ))}
                </Radio.Group>
            </Form.Item>
            <Form.Item
              name={["user", "dateOfBirth"]}
              label="Ngày sinh"
              labelCol={{ span: 8 }}
              rules={[{ required: true }]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              name={["user", "address"]}
              label="Địa chỉ"
              labelCol={{ span: 8 }}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["user", "phoneNumber"]}
              label="Điện thoại"
              labelCol={{ span: 8 }}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["user", "role"]}
              label=""
              labelCol={{ span: 8 }}
              rules={[{ required: true }]}
              initialValue={2}
              hidden
            >
              <InputNumber defaultValue={2}/>
            </Form.Item>
            <Form.Item
              name="position"
              label="Vị trí"
              labelCol={{ span: 8 }}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="note"
              label="Ghi chú"
              labelCol={{ span: 8 }}
            >
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
                {["Đang làm", "Không còn làm"].map((status, index) => (
                    <Radio value={index+1} key={index+1}>
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
              <InputNumber addonAfter="vnd"/>
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
        <ToastContainer />
    </DefaultLayout>
  )
}

export default Create
