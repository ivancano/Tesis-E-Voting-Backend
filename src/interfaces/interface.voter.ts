export interface Voter {
    id: number
    name: string
    lastname: string
    dni: string
    status: boolean
    createdAt: Date
    updatedAt: Date
    deletedAt?: Date,
    pin: string
}