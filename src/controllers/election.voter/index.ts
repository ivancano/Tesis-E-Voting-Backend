import { CreateElectionVoterDTO, UpdateElectionVoterDTO, FilterElectionVotersDTO } from "../../dto/elections.voter.dto";
import { ElectionVoter } from "../../interfaces";
import * as mapper from './mapper';
import * as service from "../../services/electionVoterService";

export const create = async(payload: CreateElectionVoterDTO): Promise<ElectionVoter> => {
    try {
        const result = await service.create(payload);
        return mapper.toElectionVoter(result)
    }
    catch(e) {
        throw e;
    }
}
export const update = async (id: number, payload: UpdateElectionVoterDTO): Promise<ElectionVoter> => {
    try {
        const result = await service.update(id, payload);
        return mapper.toElectionVoter(result)
    }
    catch(e) {
        throw e;
    }
}
export const getAll = async(filters: FilterElectionVotersDTO): Promise<ElectionVoter[]> => {
    try {
        const result = await service.getAll(filters);
        return result.map(mapper.toElectionVoter);
    }
    catch(e) {
        throw e;
    }
}
export const getById = async (id: number): Promise<ElectionVoter> => {
    try {
        const result = await service.getById(id);
        return mapper.toElectionVoter(result)
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