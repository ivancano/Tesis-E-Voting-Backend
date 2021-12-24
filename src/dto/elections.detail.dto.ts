import { Optional } from "sequelize/types"

export type CreateElectionDetailDTO = {
    electionId: number
    partyId: number
    candidateId: number
    position: string
}

export type UpdateElectionDetailDTO = Required<CreateElectionDetailDTO>

export type FilterElectionDetailsDTO = {
    isDeleted?: boolean
    includeDeleted?: boolean,
    electionId?: number
}