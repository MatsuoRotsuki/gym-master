import { Avatar, Rate, Space } from 'antd';
import React, { useEffect, useState } from 'react'
import useGymStore from './GymStore';
import { useEffectOnce } from 'usehooks-ts';
import Table, { ColumnsType } from 'antd/es/table';
import { CommentOutlined, DeleteOutlined, LoadingOutlined, WarningFilled } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Reply from './Reply';
import { showDeleteConfirm } from '~/components/Layout/ConfirmModal';

type FeedbackProps = {
    feedbacks: IFeedback[],
    staff: IStaff
    children?: React.ReactNode
}

const Feedback = ({feedbacks, children, staff} : FeedbackProps) => {
    const navigate = useNavigate()
    const total = feedbacks.length
    const [isReplyOpened, setIsReplyOpened] = useState<boolean>(false)
    const [clickFeedback, setClickFeedback] = useState<IFeedback>()
    const [deleteFeedback] = useGymStore(state => [
        state.deleteFeedback
    ])
    const onDelete = (feedbackId: number) => {
        showDeleteConfirm({
            title: 'Bạn có chắc chắn muốn xóa feedback này không?',
            icon: <WarningFilled />,
            onOk: async () => {
                try {
                    await deleteFeedback(feedbackId as unknown as string);
                    toast.success('Xóa feedback thành công', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000
                    })
                    window.location.reload()
                } catch (e) {
                    const err = e as Error
                    console.log(err.message)
                    toast.error((err as Error).message, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000
                    })
                }
            }
        })
    }
    const columns: ColumnsType<IFeedback> = [
        {
            title: 'Mã người dùng',
            dataIndex: ["member", "id"],
            key: 'id'
        },
        {
            title: 'Tên người dùng',
            key: 'id',
            render: (_, record) => (
                <button
                className="transition-colors hover:text-primary"
            >
                {`${record.member.firstName} ${record.member.lastName}`}
            </button>
            )
        },
        {
            title: 'Nội dung',
            dataIndex: "content",
            key: 'content',
        },
        {
            title: 'Đánh giá',
            key: 'stars',
            render: (_, record) => (
                <Space>
                    <Rate defaultValue={record.stars} disabled/>
                </Space>
            )
        },
        {
            title: ' ',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {/* <EditOutlined
                        onClick={() => {
                            navigate(`/nhan-vien/edit/${record.id}`)
                        }}
                        className="cursor-pointer text-primary"
                    /> */}
                    {record.replies.length >= 1 ? ("Đã reply") : (
                        <CommentOutlined 
                            title='Phản hồi'
                            onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                setIsReplyOpened(true);
                                setClickFeedback(record)
                                console.log(clickFeedback)
                            }}
                        />
                    )}
                    <DeleteOutlined className="cursor-pointer text-danger" onClick={(e) => onDelete(record.id)} />
                </Space>
            )
        }
    ]
    if (!feedbacks) return <></>
    return (
        <>
    <Table
        columns={columns}
        dataSource={feedbacks}
        pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '15', '20'],
            total: total,
        }}
        expandable={{
            expandedRowRender: (record) => (
                <>
                    {record.replies ? (
                        <>
                            <p
                                style={{
                                margin: 0,
                                }}
                            >
                                {`Content: ${record.replies[0].content}`}
                            </p>
                            <p>
                                {`Post by: ${record.replies[0].staff.firstName}  ${record.replies[0].staff.lastName}`}
                            </p>
                        </>
                    ) : (
                        <LoadingOutlined />
                    )}
                </>
            ),
            rowExpandable: (record) => record.replies.length !== 0,
          }}
    />
    <Reply staff={staff} feedback={clickFeedback as IFeedback} isOpen={isReplyOpened} setIsOpen={setIsReplyOpened} />
    <ToastContainer />
    
</>
  )
}

export default React.memo(Feedback)