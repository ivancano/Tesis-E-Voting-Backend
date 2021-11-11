import { CreateElectionDetailDTO, UpdateElectionDetailDTO, FilterElectionDetailsDTO } from "../../dto/elections.detail.dto";
import { ElectionDetail } from "../../interfaces";
import * as mapper from './mapper';
import * as service from "../../services/electionDetailService";

export const create = async(payload: CreateElectionDetailDTO): Promise<ElectionDetail> => {
    try {
        const result = await service.create(payload);
        return mapper.toElectionDetail(result)
    }
    catch(e) {
        throw e;
    }
}
export const update = async (id: number, payload: UpdateElectionDetailDTO): Promise<ElectionDetail> => {
    try {
        const result = await service.update(id, payload);
        return mapper.toElectionDetail(result)
    }
    catch(e) {
        throw e;
    }
}
export const getAll = async(filters: FilterElectionDetailsDTO): Promise<ElectionDetail[]> => {
    try {
        const result = await service.getAll(filters);
        return result.map(mapper.toElectionDetail);
    }
    catch(e) {
        throw e;
    }
}
export const getById = async (id: number): Promise<ElectionDetail> => {
    try {
        const result = await service.getById(id);
        return mapper.toElectionDetail(result)
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