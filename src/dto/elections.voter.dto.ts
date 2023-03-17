import { Optional } from "sequelize/types"

export type CreateElectionVoterDTO = {
    electionId: number
    voterId: number
    timestamp: Date
    voted: boolean
}

export type UpdateElectionVoterDTO = Required<CreateElectionVoterDTO>

export type FilterElectionVotersDTO = {
    electionId?: number
    voterId?: number
    isDeleted?: boolean
    includeDeleted?: boolean
}