import React from 'react'
import { Form, Input, Modal, Select } from 'antd'
import { equipmentType } from '~/app/config'

type PropsType = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Create = ({ isOpen, setIsOpen }: PropsType) => {
  const [form] = Form.useForm()

  const onFinish = (values: IEquipment) => {}

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
      <Form form={form} name="add-equipment" autoComplete="off" labelCol={{ span: 6 }}>
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
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: 'Mô tả không được để trống' }]}
        >
          <Input.TextArea placeholder="Nhập mô tả" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Create
