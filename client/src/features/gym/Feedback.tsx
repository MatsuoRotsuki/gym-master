import { Avatar, Rate, Space, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import useGymStore from './GymStore'
import { useEffectOnce } from 'usehooks-ts'
import Table, { ColumnsType } from 'antd/es/table'
import { CommentOutlined, DeleteOutlined, LoadingOutlined, WarningFilled } from '@ant-design/icons'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Reply from './Reply'
import { showDeleteConfirm } from '~/components/Layout/ConfirmModal'
import { customIcons } from '../feedback/List'
import useAuth from '~/hooks/useAuth'

type FeedbackProps = {
  feedbacks: IFeedback[]
  staff: IStaff
  children?: React.ReactNode
}

const Feedback = ({ feedbacks, children, staff }: FeedbackProps) => {
  const total = feedbacks.length
  const { isStaff, isAdmin } = useAuth()
  const [deleteFeedback] = useGymStore(state => [state.deleteFeedback])

  const [isReplyOpened, setIsReplyOpened] = useState<boolean>(false)
  const [clickFeedback, setClickFeedback] = useState<IFeedback>()

  const onDelete = (feedbackId: number) => {
    showDeleteConfirm({
      title: 'Bạn có chắc chắn muốn xóa feedback này không?',
      icon: <WarningFilled />,
      onOk: async () => {
        try {
          await deleteFeedback(feedbackId as unknown as string)
          toast.success('Xóa feedback thành công', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000
          })
          window.location.reload()
        } catch (e) {
          const err = e as Error
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
      title: 'STT',
      dataIndex: ['member', 'id'],
      key: 'id'
    },
    {
      title: 'Người dùng',
      key: 'id',
      render: (_, record) => (
        <button className="hover:text-primary transition-colors">
          {`${record.member.firstName} ${record.member.lastName}`}
        </button>
      )
    },
    {
      title: 'Phản hồi',
      dataIndex: 'content',
      key: 'content'
    },
    {
      title: 'Đánh giá',
      key: 'stars',
      render: (_, record) => (
        <Space>
          <Rate
            defaultValue={record.stars}
            disabled
            character={({ index }: any) => customIcons[index + 1]}
          />
        </Space>
      )
    },
    {
      title: 'Trạng thái',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {record.replies.length >= 1 ? (
            <Tag color="success">Đã phản hồi</Tag>
          ) : (
            <>
              {isAdmin || isStaff ? (
                <>
                  <CommentOutlined
                    title="Phản hồi"
                    onClick={e => {
                      e.preventDefault()
                      e.stopPropagation()
                      setIsReplyOpened(true)
                      setClickFeedback(record)
                    }}
                  />
                  <DeleteOutlined
                    className="cursor-pointer text-danger"
                    onClick={e => onDelete(record.id)}
                  />
                </>
              ) : (
                <Tag color="processing">Đang xử lý</Tag>
              )}
            </>
          )}
        </Space>
      )
    }
  ]

  return (
    <>
      <Table
        columns={columns}
        dataSource={feedbacks}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '15', '20'],
          total: total
        }}
        expandable={{
          expandedRowRender: record => (
            <>
              {record.replies ? (
                <>
                  <p
                    style={{
                      margin: 0
                    }}
                  >
                    {`Nội dung phản hồi: ${record.replies[0].content}`}
                  </p>
                  <p>
                    {`Dược phản hồi bởi: ${record.replies[0].staff.firstName}  ${record.replies[0].staff.lastName}`}
                  </p>
                </>
              ) : (
                <LoadingOutlined />
              )}
            </>
          ),
          rowExpandable: record => record.replies.length !== 0
        }}
      />
      <Reply
        staff={staff}
        feedback={clickFeedback as IFeedback}
        isOpen={isReplyOpened}
        setIsOpen={setIsReplyOpened}
      />
      <ToastContainer />
    </>
  )
}

export default React.memo(Feedback)
