import { DeleteOutlined, EditOutlined, WarningFilled } from '@ant-design/icons'
import { Space } from 'antd'
import Table, { ColumnsType } from 'antd/es/table'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { showDeleteConfirm } from '~/components/Layout/ConfirmModal'
import axiosClient from '~/lib/axiosClient'

interface Props {}


const StaffTable = (props: any) => {
    const {staffs} = props
    const navigate = useNavigate()
    const total = staffs.length

    const onDelete = (staffId: number) => {
        showDeleteConfirm({
            title: 'Bạn có chắc chắn muốn xóa nhân viên này không?',
            icon: <WarningFilled />,
            onOk: async () => {
                try {
                    await axiosClient.delete(`v1/staffs/${staffId}/delete`)
                    toast.success('Xóa nhân viên thành công', {
                        position: toast.POSITION.TOP_RIGHT
                    })
                    navigate(`/nhan-vien/`)
                } catch (e) {
                    const err = e as Error
                    console.log(err.message)
                    toast.error((err as Error).message, {
                        position: toast.POSITION.TOP_RIGHT
                    })
                }
            }
        })
    }
const columns: ColumnsType<IStaff> = [
    {
        title: 'Mã nhân viên',
        dataIndex: "id",
        key: 'id'
    },
    {
        title: 'Họ và tên',
        key: 'name',
        render: (_, record) => (
            <button
                className="transition-colors hover:text-primary"
                onClick={() => navigate(`/nhan-vien/${record.id}`)}
            >
                {`${record.firstName} ${record.lastName}`}
            </button>
        )
    },
    {
        title: 'Ngày tuyển',
        dataIndex: "hiredDate",
        key: 'hire_date',
    },
    {
        title: 'Vị trí',
        dataIndex: "position",
        key: 'position'
    },
    {
        title: 'Lương',
        dataIndex:"salary",
        key: 'salary'
    },
    {
        title: ' ',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <EditOutlined
                    onClick={() => {
                        navigate(`/nhan-vien/edit/${record.id}`)
                    }}
                    className="cursor-pointer text-primary"
                />
                <DeleteOutlined className="cursor-pointer text-danger" onClick={(e) => onDelete(record.id)} />
            </Space>
        )
    }
]
    
    return (
        <>
    <Table
        columns={columns}
        dataSource={staffs}
        pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '15', '20'],
            total: total,
        }}
    />
    <ToastContainer />
</>
    )
}

export default React.memo(StaffTable)