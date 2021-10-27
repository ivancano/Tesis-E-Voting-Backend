import { Optional } from "sequelize/types"

export type CreatePartyDTO = {
    name: string;
    status: boolean;
}

export type UpdatePartyDTO = Required<CreatePartyDTO>

export type FilterPartysDTO = {
    isDeleted?: boolean
    includeDeleted?: boolean
}