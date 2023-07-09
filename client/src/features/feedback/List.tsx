import React from 'react'
import DefaultLayout from '~/components/Layout/DefaultLayout'
import { Rate, Table, Tag } from 'antd'
import useFeedbackStore from './FeedbackStore'
import { ColumnsType } from 'antd/es/table'
import useMemberStore from '../member/MemberStore'
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

export const customIcons: Record<number, React.ReactNode> = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />
}

const List = () => {
  const navigate = useNavigate()

  const [feedbacks] = useFeedbackStore(state => [state.feedbacks])

  const columns: ColumnsType<IFeedback> = [
    {
      title: 'STT',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Hội viên',
      dataIndex: 'member',
      key: 'member',
      render: (text, record) => <p>{`${record.member.firstName} ${record.member.lastName}`}</p>
    },
    {
      title: 'Phòng gym',
      dataIndex: 'gym',
      key: 'gym',
      render: (text, record) => <p>{record.gym.name}</p>
    },
    {
      title: 'Phản hồi',
      dataIndex: 'content',
      key: 'content'
    },
    {
      title: 'Đánh giá',
      dataIndex: 'stars',
      key: 'stars',
      render: (text, record) => (
        <Rate
          defaultValue={record.stars}
          disabled
          character={({ index }: any) => customIcons[index + 1]}
        />
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <>{record.replies ? <Tag>Chưa xử lý</Tag> : <Tag color="success">Đã xử lý</Tag>}</>
      )
    }
  ]

  return (
    <DefaultLayout title="Phản hồi từ hội viên">
      <Table
        columns={columns}
        dataSource={Array.from(feedbacks.values())}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => {
              navigate(`/phan-hoi/${record.id}`)
            }
          }
        }}
      />
    </DefaultLayout>
  )
}

export default List
