import {Op} from 'sequelize';
import Voter, {VoterInput, VoterOuput} from '../models/voter';
import { FilterVotersDTO } from "../dto/voter.dto";

export const create = async (payload: VoterInput): Promise<VoterOuput> => {
    try {
        const voter = await Voter.create(payload);
        return voter
    }
    catch(e) {
        throw new Error("Se produjo un error al crear el votante")
    }
}
export const update = async (id: number, payload: Partial<VoterInput>): Promise<VoterOuput> => {
    try {
        const voter = await Voter.findByPk(id);
        if (!voter) {
            throw new Error();
        }
        const updatedVoter = await (voter as Voter).update(payload)
        return updatedVoter;
    }
    catch(e) {
        throw new Error("Se produjo un error al editar el votante")
    }
}
export const getById = async (id: number): Promise<VoterOuput> => {
    try {
        const voter = await Voter.findByPk(id);
        if (!voter) {
            throw new Error();
        }
        return voter;
    }
    catch(e) {
        throw new Error("Se produjo un error al obtener el votante")
    }
}
export const deleteById = async (id: number): Promise<boolean> => {
    try {
        const deletedVoterCount = await Voter.destroy({
            where: {id}
        })
        return !!deletedVoterCount
    }
    catch(e) {
        throw new Error("Se produjo un error al eliminar el votante")
    }
}
export const getAll = async (filters: FilterVotersDTO): Promise<VoterOuput[]> => {
    try {
        return Voter.findAll({
            where: {
                ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
            },
            ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
        })
    }
    catch(e) {
        throw new Error("Se produjo un error al obtener los votantes")
    }
}
export const getByDNI = async (filters: FilterVotersDTO): Promise<any> => {
    try {
        return Voter.findAll({
            where: {
                ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}}),
                ...(filters?.dni && {dni: filters?.dni})
            },
            ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
        })
    }
    catch(e) {
        throw new Error("Se produjo un error al obtener los votantes")
    }
}