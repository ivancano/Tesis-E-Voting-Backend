import {Op} from 'sequelize';
import ElectionVoter, {ElectionVoterInput, ElectionVoterOuput} from '../models/election.voter';
import { FilterElectionVotersDTO } from "../dto/elections.voter.dto";

export const create = async (payload: ElectionVoterInput): Promise<ElectionVoterOuput> => {
    try {
        const election = await ElectionVoter.create(payload);
        return election
    }
    catch(e) {
        throw new Error("Se produjo un error al crear la elección")
    }
}
export const update = async (id: number, payload: Partial<ElectionVoterInput>): Promise<ElectionVoterOuput> => {
    try {
        const election = await ElectionVoter.findByPk(id);
        if (!election) {
            throw new Error();
        }
        const updatedElection = await (election as ElectionVoter).update(payload)
        return updatedElection;
    }
    catch(e) {
        throw new Error("Se produjo un error al editar la elección")
    }
}
export const getById = async (id: number): Promise<ElectionVoterOuput> => {
    try {
        const election = await ElectionVoter.findByPk(id);
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
        const deletedElectionCount = await ElectionVoter.destroy({
            where: {id}
        })
        return !!deletedElectionCount
    }
    catch(e) {
        throw new Error("Se produjo un error al eliminar la elección")
    }
}
export const getAll = async (filters: FilterElectionVotersDTO): Promise<ElectionVoterOuput[]> => {
    try {
        return ElectionVoter.findAll({
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