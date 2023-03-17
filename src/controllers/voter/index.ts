import bcrypt from 'bcrypt';
import * as fs from 'fs';
import path from 'path';
import { CreateVoterDTO, UpdateVoterDTO, FilterVotersDTO, LoginVotersDTO, ElectionVotersDTO, VoteBlockchainDTO } from "../../dto/voter.dto";
import { CreateElectionVoterDTO } from '../../dto/elections.voter.dto';
import { Voter } from "../../interfaces";
import * as mapper from './mapper';
import * as service from "../../services/voterService";
import * as serviceElectionVoter from "../../services/electionVoterService";

export const create = async(payload: CreateVoterDTO, files: any): Promise<Voter> => {
    try {
        const pin = await bcrypt.hash('123456', 10);
        payload.pin = pin;
        const result = await service.create(payload);
        if(files.length > 0) {
            await fs.createReadStream(path.resolve(path.dirname(require.main.filename)+'/../dni/'+result.id+'/front', files.dniFront[0]));
            await fs.createReadStream(path.resolve(path.dirname(require.main.filename)+'/../dni/'+result.id+'/back', files.dniBack[0]));
        }
        return mapper.toVoter(result)
    }
    catch(e) {
        throw e;
    }
}
export const createBatch = async(file: any): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        try {
            await service.createBatch(file);
            resolve("Success");
        }
        catch(err) {
            reject("Error");
        }
    });
}
export const update = async (id: number, payload: UpdateVoterDTO, files: any): Promise<Voter> => {
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
export const login = async(payload: LoginVotersDTO): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const voter = await service.getByDNI({dni: payload.dni});
            if(voter.length > 0) {
                const validate = await bcrypt.compare(payload.pin, voter[0].pin);
                if(validate === false) return reject("PIN inválido");
                if(voter[0].status === false) return reject("Votante inhabilitado");
                if(voter[0].status === false) return reject("Votante inhabilitado");
                const elections = await serviceElectionVoter.getAll({voterId: voter[0].id});
                if(elections.length === 0) return reject("No posee elecciones activas");
                voter.electionsVoter = elections;
                resolve(voter);
            }
            else {
                reject("Votante inexistente");
            }
        }
        catch(e) {
            reject(e);
        }
    })
}
export const assignToElections = async(id: number, payload: ElectionVotersDTO): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const voter = await service.getById(id);
            if(voter) {
                await serviceElectionVoter.deleteByVoterId(id);
                const result = []
                for(const e of payload.electionIds) {
                    result.push(await serviceElectionVoter.create({
                        electionId: e,
                        voterId: id,
                        timestamp: new Date()
                    }));
                }
                resolve(result);
            }
            else {
                reject("Votante inexistente");
            }
        }
        catch(e) {
            reject(e);
        }
    })
}
export const voteBlockchain = async(payload: VoteBlockchainDTO): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
        try {
            const electionVoter = await serviceElectionVoter.getAll({voterId: payload.voterId, electionId: payload.electionId});
            if(electionVoter.length > 0) {
                if(electionVoter[0].voted === false) {
                    await service.voteBlockchain(payload);
                    electionVoter[0].voted = true;
                    await serviceElectionVoter.update({
                        voterId: payload.voterId,
                        electionId: payload.electionId,
                        voted: true
                    });
                    resolve(true)
                }
                else {
                    reject("El votante ya ha participado en esta elección");
                }
            }
            else {
                reject("Error al verificar si el votante ya ha participado");
            }
        }
        catch(e) {
            reject(e);
        }
    })
}
