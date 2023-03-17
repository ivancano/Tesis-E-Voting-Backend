export interface ElectionVoter {
    id: number
    electionId: number
    voterId: number
    voted: boolean
    timestamp: Date
    createdAt: Date
    updatedAt: Date
    deletedAt?: Date
}