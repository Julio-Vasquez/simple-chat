interface Username {
  username: string
}

export interface UserQueryParams {
  name: string
}

export interface RegisterUser extends Username {
  userId: string
}

export interface MessagePayload {
  message: string
  room: string
}

export interface OnlineUser extends Username {
  socketId: string
}

export interface TargetUserId {
  targetUserId: string
}
