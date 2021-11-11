import {Op} from 'sequelize';
import ElectionDetail, {ElectionDetailInput, ElectionDetailOuput} from '../models/election.detail';
import { FilterElectionDetailsDTO } from "../dto/elections.detail.dto";

export const create = async (payload: ElectionDetailInput): Promise<ElectionDetailOuput> => {
    try {
        const election = await ElectionDetail.create(payload);
        return election
    }
    catch(e) {
        throw new Error("Se produjo un error al crear la elección")
    }
}
export const update = async (id: number, payload: Partial<ElectionDetailInput>): Promise<ElectionDetailOuput> => {
    try {
        const election = await ElectionDetail.findByPk(id);
        if (!election) {
            throw new Error();
        }
        const updatedElection = await (election as ElectionDetail).update(payload)
        return updatedElection;
    }
    catch(e) {
        throw new Error("Se produjo un error al editar la elección")
    }
}
export const getById = async (id: number): Promise<ElectionDetailOuput> => {
    try {
        const election = await ElectionDetail.findByPk(id);
        if (!election) {
            throw new Error();
        }
        return election;
    }
    catch(e) {
        throw new Error("Se produjo un error al obtener la elección")
    }
}
export const deleteById = async (id: number): Promise<boolean> => {
    try {
        const deletedElectionCount = await ElectionDetail.destroy({
            where: {id}
        })
        return !!deletedElectionCount
    }
    catch(e) {
        throw new Error("Se produjo un error al eliminar la elección")
    }
}
export const getAll = async (filters: FilterElectionDetailsDTO): Promise<ElectionDetailOuput[]> => {
    try {
        return ElectionDetail.findAll({
            where: {
                ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
            },
            ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
        })
    }
    catch(e) {
        throw new Error("Se produjo un error al obtener las elecciones")
    }
}