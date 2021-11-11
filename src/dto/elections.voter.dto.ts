import { Optional } from "sequelize/types"

export type CreateElectionVoterDTO = {
    electionId: number
    voterId: number
    timestamp: Date
}

export type UpdateElectionVoterDTO = Required<CreateElectionVoterDTO>

export type FilterElectionVotersDTO = {
    isDeleted?: boolean
    includeDeleted?: boolean
}