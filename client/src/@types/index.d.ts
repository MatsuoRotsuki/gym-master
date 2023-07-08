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
  equipments: IEquipment[]
  feedbacks: IFeedback[]
  image: string
}

declare interface IEquipment {
  id: string
  name: string
  type: string
  manufacturer: string
  description: string
  gyms: IGym[]
}

declare interface IFeedback {
  id: number,
  content: string,
  stars: number,
  member: IMember
  gym: IGym,
  member: IMember
  replies: IReply[]
}

declare type EquipmentType = Map<string, IEquipment>

declare interface IUser {
  id: string
  email: string
  role: number
}

declare interface IMember {
  firstName: any
  lastName: any
  id: string
  joinedDate: Date
  weight: number
  healthCondition: string
  isBanned?: boolean
  bannedReason?: string
  note?: string
  firstName: string
  lastName: string
  gender: number
  dateOfBirth: Date
  address: string
  phoneNumber: string
  avatar?: string
  memberMemberships: IMemberMembership[]
}

declare type FilePreview = File & { preview: string }

declare interface IMemberMembership {
  id: string
  validUntil: Date
  validFrom: Date
  createdAt: Date
  hasActivated: boolean
  membership: IMembership
  membershipActivityLogs: any[]
  usageLogs: any[]
}

declare interface IMembership {
  id: string
  name: string
  monthlyPrice: number
  description: string
  maxNumOfMembers: number
  createdBy: IUser
  registrations: IMember[]
}
type IStaff = {
  id: number
  firstName: string,
  lastName: string,
  gender: number,
  dateOfBirth: Date,
  address: string,
  phoneNumber: string,
  avatar: string,
  role: string,
  hiredDate: Date
  position: string
  salary: string
  employmentStatus: number
  note: string
}

declare interface IReply {
  id: string,
  content: string,
  feedback: IFeedback,
  staff: IStaff
}

// type IMember = {
//   id: string,
//   joinDate: Date,
//   weight: number,
//   healthCondition: string,
//   isBanned: boolean,
//   bannedReason: string,
//   note: string,
//   user: IUser,
//   feedbacks: IFeedbacks[]
// }

// type IUser = {
//   id: number,
//   email: string,
//   firstName: string,
//   lastName: string,
//   gender: number,
//   dateOfBirth: Date,
//   address: string,
//   phoneNumber: string,
//   role: string,
//   staff: IStaff
// }
