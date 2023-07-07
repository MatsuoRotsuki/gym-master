type Room = {
  id: string
  name: string
  address: string
  hotline: string
  email: string
}

declare type PageType = {
  page: number
  offset: number
}

declare interface IGym {
  id: string
  name: string
  address: string
  hotline: string
  email: string
}

declare interface IEquipment {
  id: string
  name: string
  type: string
  manufacturer: string
  description: string
  gyms: IGym[]
}

declare type EquipmentType = Map<string, IEquipment>

declare interface IUser {
  id: string
  email: string
  firstName: string
  lastName: string
  gender: number
  dateOfBirth: Date
  address: string
  phoneNumber: string
  role: number
}

declare interface IMember {
  id: string
  joinedDate: Date
  weight: number
  healthCondition: string
  isBanned?: boolean
  bannedReason?: string
  note?: string
  user: IUser
}

declare type FilePreview = File & { preview: string }
declare interface IMembership {
  id: string
  name: string
  monthlyPrice: number
  description: string
  maxNumOfMembers: number
  createdBy: IUser
  registrations: IMember[]
}
