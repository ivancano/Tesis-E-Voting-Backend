import { Optional } from "sequelize/types"

export type CreateElectionDTO = {
    name: string;
    description: string;
    startTime: Date;
    endTime: Date;
    status: boolean;
}

export type UpdateElectionDTO = Required<CreateElectionDTO>

export type FilterElectionsDTO = {
    isDeleted?: boolean
    includeDeleted?: boolean
}