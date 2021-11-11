export interface ElectionDetail {
    id: number
    electionId: number
    partyId: number
    candidateId: number
    position: string
    createdAt: Date
    updatedAt: Date
    deletedAt?: Date
}