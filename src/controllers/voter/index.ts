import bcrypt from 'bcrypt';
import { CreateVoterDTO, UpdateVoterDTO, FilterVotersDTO, LoginVotersDTO } from "../../dto/voter.dto";
import { Voter } from "../../interfaces";
import * as mapper from './mapper';
import * as service from "../../services/voterService";

export const create = async(payload: CreateVoterDTO): Promise<Voter> => {
    try {
        const pin = await bcrypt.hash('123456', 10);
        payload.pin = pin;
        const result = await service.create(payload);
        return mapper.toVoter(result)
    }
    catch(e) {
        throw e;
    }
}
export const update = async (id: number, payload: UpdateVoterDTO): Promise<Voter> => {
    try {
        const result = await service.update(id, payload);
        return mapper.toVoter(result)
    }
    catch(e) {
        throw e;
    }
}
export const getAll = async(filters: FilterVotersDTO): Promise<Voter[]> => {
    try {
        const result = await service.getAll(filters);
        return result.map(mapper.toVoter);
    }
    catch(e) {
        throw e;
    }
}
export const getById = async (id: number): Promise<Voter> => {
    try {
        const result = await service.getById(id);
        return mapper.toVoter(result)
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
export const login = async(payload: LoginVotersDTO): Promise<boolean> => {
    try {
        const voter = await service.getByDNI({dni: payload.dni});
        const validate = await bcrypt.compare(payload.pin, voter[0].pin);
        return validate;
    }
    catch(e) {
        throw e;
    }
}