import {Op} from 'sequelize';
import path from 'path';
import csv from 'csv-parser';
import * as fs from 'fs';
import Voter, {VoterInput, VoterOuput} from '../models/voter';
import { FilterVotersDTO, VoteBlockchainDTO } from "../dto/voter.dto";
import ElectionVoter from '../models/election.voter';

export const create = async (payload: VoterInput): Promise<VoterOuput> => {
    try {
        const voter = await Voter.create(payload);
        return voter
    }
    catch(e) {
        throw new Error("Se produjo un error al crear el votante")
    }
}
export const createBatch = async (file: any): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        const arrayVoters: any[] = [];
        await fs.createReadStream(path.resolve(path.dirname(require.main.filename)+'/../tmp/csv/', file.filename))
        .pipe(csv())
        .on('error', error => {
            reject(false);
        })
        .on('data', row => {
            arrayVoters.push({
                'name': row.Nombre ? row.Nombre : '',
                'lastname': row.Apellido ? row.Apellido : '',
                'dni': row.DNI ? row.DNI : '',
                'dniFront': row.DNIFrente ? row.DNIFrente : '',
                'dniBack': row.DNIAtras ? row.DNIAtras : '',
                'status': row.Estado === 'Activo' ? true : false
            });
        });
        try {
            await Voter.batchProcess(arrayVoters);
            resolve(true);
        }
        catch(error) {
            reject(false);
        }
    });
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
            ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true}),
            include: [ElectionVoter]
        })
    }
    catch(e) {
        throw new Error("Se produjo un error al obtener los votantes")
    }
}
export const voteBlockchain = async (payload: VoteBlockchainDTO): Promise<any> => {
    try {
        const driver = require('bigchaindb-driver')
        const BIGCHAINDB_API = 'http://localhost:9984/api/v1/'
        const alice = new driver.Ed25519Keypair();
        const bigchainPayload = {
            electionDetailId: payload.electionDetailId,
            electionId: 'election-'+payload.electionId,
            partyId: payload.partyId,
            candidateId: payload.candidateId,
            position: payload.position,
            timestamp: new Date()
        }
        const tx = driver.Transaction.makeCreateTransaction(
            bigchainPayload,
            null,
            [ driver.Transaction.makeOutput(
                    driver.Transaction.makeEd25519Condition(alice.publicKey))
            ],
            alice.publicKey
        )
        const txSigned = driver.Transaction.signTransaction(tx, alice.privateKey)
        const conn = new driver.Connection(BIGCHAINDB_API);
        conn.postTransactionCommit(txSigned).then((retrievedTx: { id: any; }) => console.log('Transaction', retrievedTx.id, 'successfully posted.'))
    }
    catch(e) {console.log(e)
        throw new Error("Se produjo un error al votar")
    }
}