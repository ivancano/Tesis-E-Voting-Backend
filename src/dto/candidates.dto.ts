import { Optional } from "sequelize/types"

export type CreateCandidateDTO = {
    name: string;
    lastname: string;
    partyId: number;
}

export type UpdateCandidateDTO = Required<CreateCandidateDTO>

export type FilterCandidatesDTO = {
    isDeleted?: boolean
    includeDeleted?: boolean,
    partyId?: number
}