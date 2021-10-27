import { CreatePartyDTO, UpdatePartyDTO, FilterPartysDTO } from "../../dto/parties.dto";
import { Party } from "../../interfaces";
import * as mapper from './mapper';
import * as service from "../../services/partyService";

export const create = async(payload: CreatePartyDTO): Promise<Party> => {
    try {
        const result = await service.create(payload);
        return mapper.toParty(result)
    }
    catch(e) {
        throw e;
    }
}
export const update = async (id: number, payload: UpdatePartyDTO): Promise<Party> => {
    try {
        const result = await service.update(id, payload);
        return mapper.toParty(result)
    }
    catch(e) {
        throw e;
    }
}
export const getAll = async(filters: FilterPartysDTO): Promise<Party[]> => {
    try {
        const result = await service.getAll(filters);
        return result.map(mapper.toParty);
    }
    catch(e) {
        throw e;
    }
}
export const getById = async (id: number): Promise<Party> => {
    try {
        const result = await service.getById(id);
        return mapper.toParty(result)
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