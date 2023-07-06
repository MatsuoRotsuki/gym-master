import React, { useState } from 'react'
import { Button, Form, Input, Modal, Select, Space, message } from 'antd'
import { equipmentType } from '~/app/config'
import UploadImage from '~/components/UploadImage'
import useEquipmentStore from './EquipmentStore'
import { LoadingOutlined } from '@ant-design/icons'
import useGymStore from '../gym/GymStore'

type PropsType = {
  equipment: IEquipment
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Edit = ({ equipment, isOpen, setIsOpen }: PropsType) => {
  const [form] = Form.useForm()

  const [rooms] = useGymStore(state => [state.rooms])
  const [updateEquipment] = useEquipmentStore(state => [state.updateEquipment])

  const [image, setImage] = useState<FilePreview | null | { preview: string }>({
    preview:
      'https://firebasestorage.googleapis.com/v0/b/gym-master-3bb8c.appspot.com/o/images%2Fgym-equipment.jpg?alt=media&token=d30ba9f2-7edf-4e36-a2b5-3586fba43f65'
  })
  const [isLoading, setIsLoading] = useState(false)

  const onFinish = (values: IEquipment) => {
    if (!image) return
    setIsLoading(true)

    updateEquipment({ ...values, id: equipment.id, gyms: [] })
      .then(() => {
        setIsOpen(false)
        message.open({
          type: 'success',
          content: 'Cập nhật thiết bị thành công !'
        })
        form.resetFields()
        setImage(null)
      })
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false))
  }

  return (
    <Modal
      title="Thêm thiết bị mới"
      open={isOpen}
      onOk={() => setIsOpen(false)}
      onCancel={() => setIsOpen(false)}
      width={680}
      footer={[<></>]}
      centered
    >
      <Form
        form={form}
        name="add-equipment"
        onFinish={onFinish}
        initialValues={{
          ...equipment,
          gyms: equipment.gyms.map(gym => gym.id)
        }}
        autoComplete="off"
        labelCol={{ span: 6 }}
        className="custom-scroll-bar max-h-[75vh] overflow-y-auto pe-1"
      >
        <Form.Item
          label="Tên thiết bị"
          name="name"
          rules={[{ required: true, message: 'Tên thiết bị không được để trống' }]}
        >
          <Input placeholder="Nhập tên thiết bị" />
        </Form.Item>

        <Form.Item
          label="Loại thiết bị"
          name="type"
          rules={[{ required: true, message: 'Loại thiết bị không được để trống' }]}
        >
          <Select
            showSearch
            placeholder="Nhập họ tên thiết bị"
            options={Object.keys(equipmentType).map(each => ({
              label: each,
              value: each
            }))}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>

        <Form.Item
          label="Hãng sản xuất"
          name="manufacturer"
          rules={[{ required: true, message: 'Hãng sản xuất không được để trống' }]}
        >
          <Input placeholder="Nhập hãng sản xuất" />
        </Form.Item>

        <Form.Item
          label="Phòng gym"
          name="gyms"
          rules={[{ required: true, message: 'Hãy chọn ít nhất một phòng gym' }]}
        >
          <Select
            showSearch
            mode="multiple"
            placeholder="Nhập họ tên người chủ hộ"
            options={Array.from(rooms).map(room => ({
              label: `${room.name} - ${room.address}`,
              value: room.id
            }))}
            filterOption={(input, option) =>
              (option?.label.split('-')[0] ?? '').toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: 'Mô tả không được để trống' }]}
        >
          <Input.TextArea placeholder="Nhập mô tả" />
        </Form.Item>

        <Form.Item label="Ảnh minh họa" required>
          <UploadImage image={image} setImage={setImage} className="aspect-square w-[8rem]" />
        </Form.Item>

        <Space className="flex justify-end">
          <Button
            type="primary"
            ghost
            danger
            htmlType="button"
            onClick={() => {
              form.resetFields()
              setImage(null)
              setIsOpen(false)
            }}
          >
            Hủy
          </Button>
          <Button type="primary" ghost htmlType="submit" disabled={isLoading}>
            {isLoading ? (
              <LoadingOutlined className="justity-center flex items-center" />
            ) : (
              'Xác nhận'
            )}
          </Button>
        </Space>
      </Form>
    </Modal>
  )
}

export default Edit
