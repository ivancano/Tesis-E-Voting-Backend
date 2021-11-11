export interface Election {
    id: number
    name: string
    description: string,
    startTime: Date,
    endTime: Date
    status: boolean
    createdAt: Date
    updatedAt: Date
    deletedAt?: Date
}