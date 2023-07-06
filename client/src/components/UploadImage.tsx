import React, { ChangeEventHandler } from 'react'
import { InboxOutlined } from '@ant-design/icons'

type PropsType = {
  image: FilePreview | null | { preview: string }
  setImage: React.Dispatch<React.SetStateAction<FilePreview | null | { preview: string }>>
  className?: string
}

const UploadImage = ({ image, setImage, className }: PropsType) => {
  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = event => {
    if (!event.target.files || event.target.files.length === 0) return

    const file = event.target.files[0] as FilePreview
    const url = URL.createObjectURL(file)
    file.preview = url
    setImage(file)
  }

  return (
    <div
      className={`relative mb-2 flex min-h-[8rem] cursor-pointer items-center justify-center rounded-md border border-dashed border-noneSelected bg-neutral-2 text-center transition-colors hover:border-primary-4 ${className}`}
    >
      {image ? (
        <img src={image.preview} className="h-full w-full rounded-md object-cover" />
      ) : (
        <div className="flex flex-col items-center justify-center gap-1 py-3 ">
          <InboxOutlined className="flex items-center justify-center text-4xl text-primary-4" />
          <p className="text-base font-semibold">Đăng tải ảnh</p>
        </div>
      )}

      <input
        type="file"
        className="absolute right-0 top-0 h-full w-full opacity-0"
        onChange={handleChangeInput}
        accept=".png,.jpg,.jpeg"
      />
    </div>
  )
}

export default UploadImage
