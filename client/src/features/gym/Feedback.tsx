import { Avatar, Rate, Space } from 'antd';
import React, { useEffect, useState } from 'react'
import useGymStore from './GymStore';
import { useEffectOnce } from 'usehooks-ts';
import Table, { ColumnsType } from 'antd/es/table';
import { CommentOutlined } from '@ant-design/icons';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Reply from './Reply';

type FeedbackProps = {
    feedbacks: IFeedback[],
    children?: React.ReactNode
}

const Feedback = ({feedbacks, children} : FeedbackProps) => {
    const navigate = useNavigate()
    const total = feedbacks.length
    const [isReplyOpened, setIsReplyOpened] = useState<boolean>(false)
    const [clickFeedback, setClickFeedback] = useState<IFeedback>()
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
    />
    <Reply feedback={clickFeedback as IFeedback} isOpen={isReplyOpened} setIsOpen={setIsReplyOpened} />
    <ToastContainer />
    
</>
  )
}

export default React.memo(Feedback)