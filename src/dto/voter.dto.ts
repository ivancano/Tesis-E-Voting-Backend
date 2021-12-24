import { Optional } from "sequelize/types"

export type CreateVoterDTO = {
    name: string;
    lastname: string;
    dni: string;
    status: boolean;
    pin: string
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