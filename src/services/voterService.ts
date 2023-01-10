import {Op} from 'sequelize';
import path from 'path';
import csv from 'csv-parser';
import * as fs from 'fs';
import Voter, {VoterInput, VoterOuput} from '../models/voter';
import { FilterVotersDTO } from "../dto/voter.dto";

export const create = async (payload: VoterInput): Promise<VoterOuput> => {
    try {
        payload.pin = '1234';
        const voter = await Voter.create(payload);
        return voter
    }
    catch(e) {
        throw new Error("Se produjo un error al crear el votante")
    }
}
export const createBatch = async (file: any): Promise<any> => {
    try {
        await fs.createReadStream(path.resolve(path.dirname(require.main.filename)+'/../tmp/csv/', file.filename))
        .pipe(csv())
        .on('error', error => console.error(error))
        .on('data', async row => {
            const newVoter = new Voter();
            newVoter.name = row.Nombre ? row.Nombre : '';
            newVoter.lastname = row.Apellido ? row.Apellido : '';
            newVoter.dni = row.DNI ? row.DNI : '';
            newVoter.pin = '1234';
            newVoter.status = row.Estado === 'Activo' ? true : false;
            await newVoter.save();
        })
        .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} rows`));
        return 'Success';
    }
    catch(e) {console.log(e)
        throw new Error("Se produjo un error al crear el partido político")
    }
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
            ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
        })
    }
    catch(e) {
        throw new Error("Se produjo un error al obtener los votantes")
    }
}