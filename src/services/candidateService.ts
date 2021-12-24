import {Op} from 'sequelize';
import Candidate, {CandidateInput, CandidateOuput} from '../models/candidate';
import { FilterCandidatesDTO } from "../dto/candidates.dto";
import Party from '../models/party';
import { Literal } from 'sequelize/types/lib/utils';

export const create = async (payload: CandidateInput): Promise<CandidateOuput> => {
    try {
        const candidate = await Candidate.create(payload);
        return candidate
    }
    catch(e) {
        throw new Error("Se produjo un error al crear el candidato")
    }
}
export const update = async (id: number, payload: Partial<CandidateInput>): Promise<CandidateOuput> => {
    try {
        const candidate = await Candidate.findByPk(id);
        if (!candidate) {
            throw new Error();
        }
        const updatedCandidate = await (candidate as Candidate).update(payload)
        return updatedCandidate;
    }
    catch(e) {
        throw new Error("Se produjo un error al editar el candidato")
    }
}
export const getById = async (id: number): Promise<CandidateOuput> => {
    try {
        const candidate = await Candidate.findByPk(id, {
            include: Party
        });
        if (!candidate) {
            throw new Error();
        }
        return candidate;
    }
    catch(e) {
        throw new Error("Se produjo un error al obtener el candidato")
    }
}
export const deleteById = async (id: number): Promise<boolean> => {
    try {
        const deletedCandidateCount = await Candidate.destroy({
            where: {id}
        })
        return !!deletedCandidateCount
    }
    catch(e) {
        throw new Error("Se produjo un error al eliminar el candidato")
    }
}
export const getAll = async (filters: FilterCandidatesDTO): Promise<CandidateOuput[]> => {
    try {
        return Candidate.findAll({
            where: {
                ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}}),
                ...(filters?.partyId && {partyId: filters?.partyId})
            },
            ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true}),
            include: Party
        })
    }
    catch(e) {
        throw new Error("Se produjo un error al obtener los candidatos")
    }
}