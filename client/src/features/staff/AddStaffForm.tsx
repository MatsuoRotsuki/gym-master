import React, { useState } from 'react'
import { Button, DatePicker, Form, Input, InputNumber, Space } from 'antd'
import HomeLayout from '~/components/Layout/HomeLayout'
import { showDeleteConfirm } from '~/components/Layout/ConfirmModal'
import SubHeader from '~/components/Layout/SubHeader'
import { useForm } from 'antd/es/form/Form'
import axiosClient from '~/lib/axiosClient'
import { ToastContainer, toast } from 'react-toastify'
import moment from 'moment'
import { ExclamationCircleFilled, LoadingOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

interface Props {}

const AddStaffForm = () => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const onFinish = async (values: IStaff) => {
        try {
            setLoading(true)
            const { user_id, hired_date, position, salary } = values
            const inputDate = new Date(values.hired_date);
            const formattedDate = moment(inputDate).format('YYYY-MM-DD');
            const newItem = {
                user_id,
                hired_date: formattedDate,
                position,
                salary
            }
            await axiosClient.post(`/items/create`, newItem)
            toast.success(`Đã thêm vật phẩm`, {
                position: toast.POSITION.TOP_RIGHT
            })
        } catch (error) {
            toast.error((error as Error).message, {
                position: toast.POSITION.TOP_RIGHT
            })
        } finally {
            setLoading(false)
        }
    }
  return (
    <HomeLayout>
        <div className="min-h-full w-full rounded-lg bg-bgPrimary px-4 py-2 shadow-md">
            <SubHeader title={`Thêm vật phẩm mới`} type="create" />
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                name="form_in_modal"
                title="Thêm sự kiện"
                initialValues={{ modifier: 'public' }}
                className="grid auto-rows-max grid-cols-8"
            >
                <div className="col-span-6 col-start-1">

                    <Form.Item
                        name="user_id"
                        label="Mã người dùng của nhân viên"
                        labelCol={{ span: 8 }}
                        rules={[{ required: true, message: 'Hãy nhập mã người dùng của nhân viên' }]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        name="hired_date"
                        label="Ngày vào làm"
                        labelCol={{ span: 8 }}
                        rules={[{ required: true, message: 'Hãy chọn ngày vào làm' }]}
                    >
                        <DatePicker picker="date"/>
                    </Form.Item>
                    <Form.Item
                        name="position"
                        label="Vị trí"
                        labelCol={{ span: 8 }}
                        rules={[{ required: true, message: 'Vị trí của nhân viên', type: 'string' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="salary"
                        label="Lương khởi điểm"
                        labelCol={{ span: 8 }}
                        rules={[{ required: true, message: 'Lương khởi điểm của nhân viên', type: 'string' }]}
                    >
                        <Input />
                    </Form.Item>
    
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
                </div>
            </Form>
            <ToastContainer />
        </div>
    </HomeLayout>)
}

export default AddStaffForm