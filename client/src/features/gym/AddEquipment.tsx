import { LoadingOutlined } from '@ant-design/icons'
import { Space, Button, Form, Input, Select } from 'antd'
import form from 'antd/es/form'
import Modal from 'antd/es/modal/Modal'
import Title from 'antd/es/typography/Title'
import { AxiosError } from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axiosClient from '~/lib/axiosClient'
import useEquipmentStore from '../equipment/EquipmentStore'

interface Props {
    room: IGym
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AddEquipment = ({room, isOpen, setIsOpen}: Props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [form] = Form.useForm()
    const [equipments] = useEquipmentStore(state => [
        state.equipments
    ])
    const [equipmentName, setEquipmentName] = useState('')
    const [filterEquipments, setFilterEquipments] = useState<IEquipment[]>([])

    const fetchNameChange = (input: string) => {
        setEquipmentName(input)
        const filtered = Array.from(equipments.values()).filter(equipment => equipment.name.toLowerCase().includes(input.toLowerCase()))
        setFilterEquipments(filtered)
      }
    
      const handleChangeEquipName = (name: string) => {
        setEquipmentName(name)
      }
    const onFinish = async (values: any) => {
        setIsLoading(true)
        try {
          await axiosClient.put(`/gyms/${room.id}/equipments/${values.id}`)
          form.resetFields()
          setTimeout(() => {
            toast.success('Thêm trang bị cho phòng tập thành công', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000,
              toastId: 'edit-gym-success'
            })
          }, 200)
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
          <p>Thêm trang bị cho phòng tập</p>
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
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        >
            <Form.Item
              name="id"
              label="Tên thiết bị"
              labelCol={{ span: 8 }}
              rules={[{ required: true }]}
            >
              <Select
                //mode="multiple"
                style={{ width: '500px' }}
                value={equipmentName}
                placeholder="Tìm kiếm thiết bị"
                onChange={handleChangeEquipName}
                onSearch={fetchNameChange}
                filterOption={false}
                notFoundContent={null}
                showSearch
              >
                {filterEquipments.map(obj => (
                  <Select.Option key={obj.id} value={obj.id}>
                    {obj.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
        </Form>
    </Modal>
  )
}

export default AddEquipment