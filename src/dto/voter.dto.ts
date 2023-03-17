import { Optional } from "sequelize/types"

export type CreateVoterDTO = {
    name: string;
    lastname: string;
    dni: string;
    status: boolean;
    pin: string
    dniFront: string
    dniBack: string
}

export type UpdateVoterDTO = Required<CreateVoterDTO>

export type FilterVotersDTO = {
    isDeleted?: boolean
    includeDeleted?: boolean,
    dni?: string
}

export type LoginVotersDTO = {
    dni: string,
    pin: string
}

export type ElectionVotersDTO = {
    electionIds: number[]
}

export type VoteBlockchainDTO = {
    electionDetailId: number,
    electionId: number,
    partyId: number,
    candidateId: number,
    position: string,
    voterId: number
}