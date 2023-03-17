import { CreateElectionDTO, UpdateElectionDTO, FilterElectionsDTO } from "../../dto/elections.dto";
import { Election } from "../../interfaces";
import * as mapper from './mapper';
import * as service from "../../services/electionService";

export const create = async(payload: CreateElectionDTO): Promise<Election> => {
    try {
        const result = await service.create(payload);
        return mapper.toElection(result)
    }
    catch(e) {
        throw e;
    }
}
export const createBatch = async(file: any): Promise<string> => {
    try {
        const result = await service.createBatch(file);
        return result;
    }
    catch(e) {
        throw e;
    }
}
export const update = async (id: number, payload: UpdateElectionDTO): Promise<Election> => {
    try {
        const result = await service.update(id, payload);
        return mapper.toElection(result)
    }
    catch(e) {
        throw e;
    }
}
export const getAll = async(filters: FilterElectionsDTO): Promise<Election[]> => {
    try {
        const result = await service.getAll(filters);
        return result.map(mapper.toElection);
    }
    catch(e) {
        throw e;
    }
}
export const getById = async (id: number): Promise<Election> => {
    try {
        const result = await service.getById(id);
        return mapper.toElection(result)
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
export const getVoteCounter = async (id: number): Promise<any> => {
    try {
        const result = await service.getVoteCounter(id);
        return result;
    }
    catch(e) {
        throw e;
    }
}
export const getVoteCounterDetail = async (id: number, candidateId: number): Promise<any> => {
    try {
        const result = await service.getVoteCounterDetail(id, candidateId);
        return result;
    }
    catch(e) {
        throw e;
    }
}
export const getActaEscrutinio = async (electionId: number): Promise<any> => {
    try {
        const election = await service.getActaEscrutinio(electionId);
        return election;
    }
    catch(e) {
        throw e;
    }
}