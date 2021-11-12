import Party from "../models/party";

export interface Candidate {
    id: number
    name: string
    lastname: string
    partyId: number
    party?: Party
    createdAt: Date
    updatedAt: Date
    deletedAt?: Date
}