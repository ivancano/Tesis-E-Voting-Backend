import {Op} from 'sequelize';
import path from 'path';
import csv from 'csv-parser';
import * as fs from 'fs';
import Candidate, {CandidateInput, CandidateOuput} from '../models/candidate';
import { FilterCandidatesDTO } from "../dto/candidates.dto";
import Party from '../models/party';

export const create = async (payload: CandidateInput): Promise<CandidateOuput> => {
    try {
        const candidate = await Candidate.create(payload);
        return candidate
    }
    catch(e) {
        throw new Error("Se produjo un error al crear el candidato")
    }
}
export const createBatch = async (file: any): Promise<any> => {
    try {
        await fs.createReadStream(path.resolve(path.dirname(require.main.filename)+'/../tmp/csv/', file.filename))
        .pipe(csv())
        .on('error', error => console.error(error))
        .on('data', async row => {
            const newCandidate = new Candidate();
            newCandidate.name = row.Nombre ? row.Nombre : '';
            newCandidate.lastname = row.Apellido ? row.Apellido : '';
            const party = await Party.findAll({where: {name: row.PartidoPolitico}});
            newCandidate.partyId = party[0].id;
            await newCandidate.save();
        })
        .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} rows`));
        return 'Success';
    }
    catch(e) {console.log(e)
        throw new Error("Se produjo un error al crear el partido político")
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