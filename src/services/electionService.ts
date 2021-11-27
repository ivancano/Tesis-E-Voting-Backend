import {Op} from 'sequelize';
import Election, {ElectionInput, ElectionOuput} from '../models/election';
import { FilterElectionsDTO } from "../dto/elections.dto";

export const create = async (payload: ElectionInput): Promise<ElectionOuput> => {
    try {
        const election = await Election.create(payload);
        return election
    }
    catch(e) {console.log(e);
        throw new Error("Se produjo un error al crear la elección")
    }
}
export const update = async (id: number, payload: Partial<ElectionInput>): Promise<ElectionOuput> => {
    try {
        const election = await Election.findByPk(id);
        if (!election) {
            throw new Error();
        }
        const updatedElection = await (election as Election).update(payload)
        return updatedElection;
    }
    catch(e) {
        throw new Error("Se produjo un error al editar la elección")
    }
}
export const getById = async (id: number): Promise<ElectionOuput> => {
    try {
        const election = await Election.findByPk(id);
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
        const deletedElectionCount = await Election.destroy({
            where: {id}
        })
        return !!deletedElectionCount
    }
    catch(e) {
        throw new Error("Se produjo un error al eliminar la elección")
    }
}
export const getAll = async (filters: FilterElectionsDTO): Promise<ElectionOuput[]> => {
    try {
        return Election.findAll({
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