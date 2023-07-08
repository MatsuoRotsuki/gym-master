import React, { useState } from 'react'
import DefaultLayout from '~/components/Layout/DefaultLayout'
import { LoadingOutlined, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from './AuthStore'

const Login = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [login] = useAuthStore(state => [state.login])

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onFinish = (values: CredentialsType) => {
    setIsLoading(true)
    const { email, password } = values
    login({ email, password })
      .then(() => {
        form.resetFields()
        navigate('/')
        message.success('Đăng nhập thành công')
      })
      .catch(error => {
        message.error('Tên đăng nhập hoặc mật khẩu không chính xác !')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Form
        form={form}
        name="login"
        onFinish={onFinish}
        autoComplete="off"
        className="w-[25vw] rounded-md"
      >
        <Form.Item name="email" rules={[{ required: true, message: 'Email không thể bỏ trống.' }]}>
          <Input
            size="large"
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Mật khẩu không thể bỏ trống.' }]}
        >
          <Input
            size="large"
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Mật khẩu"
          />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Ghi nhớ đăng nhập</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button size="large" type="primary" ghost htmlType="submit" className="mt-4" block>
            {isLoading ? <LoadingOutlined /> : 'Đăng nhập'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default Login
