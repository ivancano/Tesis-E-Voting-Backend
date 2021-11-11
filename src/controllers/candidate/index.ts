import { CreateCandidateDTO, UpdateCandidateDTO, FilterCandidatesDTO } from "../../dto/candidates.dto";
import { Candidate } from "../../interfaces";
import * as mapper from './mapper';
import * as service from "../../services/candidateService";

export const create = async(payload: CreateCandidateDTO): Promise<Candidate> => {
    try {
        const result = await service.create(payload);
        return mapper.toCandidate(result)
    }
    catch(e) {
        throw e;
    }
}
export const update = async (id: number, payload: UpdateCandidateDTO): Promise<Candidate> => {
    try {
        const result = await service.update(id, payload);
        return mapper.toCandidate(result)
    }
    catch(e) {
        throw e;
    }
}
export const getAll = async(filters: FilterCandidatesDTO): Promise<Candidate[]> => {
    try {
        const result = await service.getAll(filters);
        return result.map(mapper.toCandidate);
    }
    catch(e) {
        throw e;
    }
}
export const getById = async (id: number): Promise<Candidate> => {
    try {
        const result = await service.getById(id);
        return mapper.toCandidate(result)
    }
    catch(e) {
        throw e;
    }
}
export const deleteById = async(id: number): Promise<boolean> => {
    try {
        const isDeleted = await service.deleteById(id)
        return isDeleted
    }
    catch(e) {
        throw e;
    }
}