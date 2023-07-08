import { LoadingOutlined } from '@ant-design/icons'
import { Space, Button, Form, Input } from 'antd'
import form from 'antd/es/form'
import Modal from 'antd/es/modal/Modal'
import Title from 'antd/es/typography/Title'
import { AxiosError } from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axiosClient from '~/lib/axiosClient'

interface Props {
    staff: IStaff
    feedback: IFeedback
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Reply = ({staff, feedback, isOpen, setIsOpen}: Props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [form] = Form.useForm()
    const onFinish = async (values: IReply) => {
        setIsLoading(true)
        try {
          await axiosClient.post(`staffs/${staff.id}/feedbacks/${feedback.id}/replies`, {
            content: values.content
          })
          form.resetFields()
          setTimeout(() => {
            toast.success('Gửi reply thành công', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000,
              toastId: 'edit-gym-success'
            })
          }, 200)
          window.location.reload()
        } catch (error) {
        //   const axiosError = error as AxiosError
        //   const dataError: { error: string } | unknown = axiosError.response?.data
        //   const dataError2 = dataError as { error: string }
        //   const messageError = dataError2.error
          toast.error("Lỗi phản hồi", {
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
          <p>Gửi phản hồi</p>
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
        {feedback ? (
            <>
            <p>
            <span style={{fontWeight: 700}}>Nội dung phản hồi:</span>
            <span>{` ${feedback.content}`}</span>
            </p>
            <p>
                <span style={{fontWeight: 700}}>Tên người dùng:</span>
                <span>{` ${feedback.member.firstName} ${feedback.member.lastName}`}</span>
            </p> 
            </>
        ) : (
            <LoadingOutlined />
        )}
        <Form
        form={form}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        >
            <Form.Item
                className="w-full"
                label="Phản hồi"
                name="content"
                rules={[{ required: true, message: 'Phản hồi không được để trống' }]}
            >
                <Input placeholder="Nhập phản hồi" />
            </Form.Item>
        </Form>
    </Modal>
  )
}

export default Reply