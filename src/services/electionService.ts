import {Op} from 'sequelize';
import path from 'path';
import csv from 'csv-parser';
import * as fs from 'fs';
import moment from 'moment';
import Election, {ElectionInput, ElectionOuput} from '../models/election';
import { FilterElectionsDTO } from "../dto/elections.dto";
import * as serviceCandidate from "./candidateService";
import * as serviceParty from "./partyService";

interface VoteCounterCandidateInterface {
    [key: number]: number
}

interface VoteCounterInterface {
    [key: string]: VoteCounterCandidateInterface[]
}

export const create = async (payload: ElectionInput): Promise<ElectionOuput> => {
    try {
        const election = await Election.create(payload);
        return election
    }
    catch(e) {console.log(e);
        throw new Error("Se produjo un error al crear la elección")
    }
}
export const createBatch = async (file: any): Promise<any> => {
    try {
        await fs.createReadStream(path.resolve(path.dirname(require.main.filename)+'/../tmp/csv/', file.filename))
        .pipe(csv())
        .on('error', error => console.error(error))
        .on('data', async row => {
            const newElection = new Election();
            newElection.name = row.Nombre ? row.Nombre : '';
            newElection.description = row.Descripcion ? row.Descripcion : '';
            newElection.startTime = row.FechaInicio ? moment(row.FechaInicio, 'DD-MM-YYYY HH:mm:ss').toDate() : moment().toDate();
            newElection.endTime = row.FechaFin ? moment(row.FechaFin, 'DD-MM-YYYY HH:mm:ss').toDate() : moment().toDate();
            newElection.status = row.Estado === 'Activo' ? true : false;
            await newElection.save();
        })
        .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} rows`));
        return 'Success';
    }
    catch(e) {console.log(e)
        throw new Error("Se produjo un error al crear la elección")
    }
}
export const update = async (id: number, payload: Partial<ElectionInput>): Promise<ElectionOuput> => {
    try {
        const election = await Election.findByPk(id);
        if (!election) {
            throw new Error();
        }
        const updatedElection = await (election as Election).update(payload)
        return updatedElection;
    }
    catch(e) {
        throw new Error("Se produjo un error al editar la elección")
    }
}
export const getById = async (id: number): Promise<ElectionOuput> => {
    try {
        const election = await Election.findByPk(id);
        if (!election) {
            throw new Error();
        }
        return election;
    }
    catch(e) {
        throw new Error("Se produjo un error al obtener la elección")
    }
}
export const deleteById = async (id: number): Promise<boolean> => {
    try {
        const deletedElectionCount = await Election.destroy({
            where: {id}
        })
        return !!deletedElectionCount
    }
    catch(e) {
        throw new Error("Se produjo un error al eliminar la elección")
    }
}
export const getAll = async (filters: FilterElectionsDTO): Promise<ElectionOuput[]> => {
    try {
        return Election.findAll({
            where: {
                ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
            },
            ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
        })
    }
    catch(e) {
        throw new Error("Se produjo un error al obtener las elecciones")
    }
}
export const getVoteCounter = async (id: number): Promise<any> => {
    try {
        const BIGCHAINDB_API = 'http://localhost:9984/api/v1/'
        const transactionsFetch = await fetch(BIGCHAINDB_API + 'assets?search="election-'+id+'"');
        const transactions = await transactionsFetch.json();
        const result: VoteCounterInterface = {};
        for(const t of transactions) {
            if(t.data.position in result) {
                let candidateFound = false;
                for(let i = 0; i < result[t.data.position].length; i++) {
                    if(t.data.candidateId in result[t.data.position][i]) {
                        result[t.data.position][i][t.data.candidateId] = result[t.data.position][i][t.data.candidateId] + 1;
                        candidateFound = true;
                    }
                }
                if(candidateFound === false) {
                    const voterCandidate: VoteCounterCandidateInterface = {}
                    voterCandidate[t.data.candidateId] = 1;
                    result[String(t.data.position)].push(voterCandidate);
                }
            }
            else {
                const voterCandidate: VoteCounterCandidateInterface = {}
                voterCandidate[t.data.candidateId] = 1;
                result[String(t.data.position)] = [voterCandidate];
            }
        }
        return result;
    }
    catch(e) {console.log(e)
        throw new Error("Se produjo un error al obtener los votos")
    }
}
export const getVoteCounterDetail = async (id: number, candidateId: number): Promise<any> => {
    try {
        const BIGCHAINDB_API = 'http://localhost:9984/api/v1/'
        const transactionsFetch = await fetch(BIGCHAINDB_API + 'assets?search="election-'+id+'"');
        const transactions = await transactionsFetch.json();
        const result: any = [];
        for(const t of transactions) {
            if(t.data.electionId === 'election-'+id && t.data.candidateId === candidateId) {
                result.push(t);
            }
        }
        return result;
    }
    catch(e) {console.log(e)
        throw new Error("Se produjo un error al obtener los votos")
    }
}
export const getActaEscrutinio = async (id: number): Promise<any> => {
    try {
        const blockchainResult = await getVoteCounter(id);
        const candidates = await serviceCandidate.getAll({});
        const parties = await serviceParty.getAll({});
        const positions = Object.keys(blockchainResult);
        const result: any = {}
        for(const p of positions) {
            result[p] = []
            for(const r of blockchainResult[p]) {
                const candidateId = Object.keys(r)[0];
                const currentCandidate = candidates.filter(x => String(x.id) === candidateId);
                result[p].push({
                    candidate: currentCandidate[0],
                    votes: r[candidateId],
                    party: parties.filter(x => x.id === currentCandidate[0].partyId)[0]
                })
            }
        }
        return result;
    }
    catch(e) {console.log(e)
        throw new Error("Se produjo un error al obtener los votos")
    }
}
