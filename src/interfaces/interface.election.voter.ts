export interface ElectionVoter {
    id: number
    electionId: number
    voterId: number
    timestamp: Date
    createdAt: Date
    updatedAt: Date
    deletedAt?: Date
}