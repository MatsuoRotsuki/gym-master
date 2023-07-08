import React from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import DefaultLayout from '~/components/Layout/DefaultLayout'
import useFeedbackStore from './FeedbackStore'
import useMemberStore from '../member/MemberStore'
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons'
import { Form, Input, Rate, Tag } from 'antd'
import GymRoomThumbnail from '~/assets/gym-room.jpg'
import ButtonBack from '~/components/ButtonBack'

type DetailItemWrapperPropsType = {
  label: string
  title: React.ReactNode
  className?: string
}

const customIcons: Record<number, React.ReactNode> = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />
}

const DetailItemWrapper = ({ label, title, className }: DetailItemWrapperPropsType) => (
  <div className={`mb-2 grid w-full grid-cols-5 items-start font-medium ${className}`}>
    <p className="col-span-2 text-base text-noneSelected">{label}</p>
    <div className="col-span-4">{title}</div>
  </div>
)

const Detail = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [feedbacks] = useFeedbackStore(state => [state.feedbacks])
  const [members] = useMemberStore(state => [state.members])
  const feedback = feedbacks.get(id as string) as IFeedback

  if (!id || !feedback) navigate(-1)

  return (
    <DefaultLayout title={<ButtonBack />}>
      {feedback && (
        <div className="flex items-start justify-start gap-4">
          <div className="min-h-full w-3/5 rounded-md border border-disabled p-2 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="mb-4 text-lg font-medium">Thông tin phản hồi</p>

              {feedback.replies ? <Tag>Chưa xử lý</Tag> : <Tag color="success">Đã xử lý</Tag>}
            </div>

            <DetailItemWrapper
              label="Hội viên: "
              title={`${feedback.member.firstName} ${feedback.member.lastName}`}
            />

            <DetailItemWrapper
              label="Đánh giá: "
              title={
                <Rate
                  defaultValue={feedback.stars}
                  disabled
                  character={({ index }: any) => customIcons[index + 1]}
                />
              }
            />

            <DetailItemWrapper
              label="Nội dung phản hồi: "
              title={feedbacks.get(id as string)?.content}
            />

            <DetailItemWrapper
              label="Đánh giá: "
              title={<Input.TextArea placeholder="Trả lời phản hồi của khách hàng..." />}
            />
          </div>

          <div className="h-full w-2/5">
            <p className="mb-4 text-lg font-medium">Phòng tập</p>

            <button
              className="flex h-max w-full items-start justify-start gap-2 rounded-md border border-disabled p-2"
              onClick={() => navigate(`/phong-tap/${feedback.gym.id}`)}
            >
              <img
                src={GymRoomThumbnail}
                alt="gym-room-thumbnail"
                className="aspect-square w-[8rem] rounded-md object-cover"
              />

              <div className="text-start">
                <p className="text-xl font-medium">{feedback.gym.name}</p>
                <p>{feedback.gym.address}</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </DefaultLayout>
  )
}

export default Detail
