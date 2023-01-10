import {Op} from 'sequelize';
import path from 'path';
import csv from 'csv-parser';
import * as fs from 'fs';
import Party, {PartyInput, PartyOuput} from '../models/party';
import { FilterPartysDTO } from "../dto/parties.dto";

export const create = async (payload: PartyInput): Promise<PartyOuput> => {
    try {
        const party = await Party.create(payload);
        return party
    }
    catch(e) {
        throw new Error("Se produjo un error al crear el partido político")
    }
}
export const createBatch = async (file: any): Promise<any> => {
    try {
        await fs.createReadStream(path.resolve(path.dirname(require.main.filename)+'/../tmp/csv/', file.filename))
        .pipe(csv())
        .on('error', error => console.error(error))
        .on('data', async row => {
            const newParty = new Party();
            newParty.name = row.Nombre ? row.Nombre : '';
            newParty.status = row.Estado === 'Activo' ? true : false;
            await newParty.save();
        })
        .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} rows`));
        return 'Success';
    }
    catch(e) {console.log(e)
        throw new Error("Se produjo un error al crear el partido político")
    }
}
export const update = async (id: number, payload: Partial<PartyInput>): Promise<PartyOuput> => {
    try {
        const party = await Party.findByPk(id);
        if (!party) {
            throw new Error();
        }
        const updatedParty = await (party as Party).update(payload)
        return updatedParty;
    }
    catch(e) {
        throw new Error("Se produjo un error al editar el partido político")
    }
}
export const getById = async (id: number): Promise<PartyOuput> => {
    try {
        const party = await Party.findByPk(id);
        if (!party) {
            throw new Error();
        }
        return party;
    }
    catch(e) {
        throw new Error("Se produjo un error al obtener el partido político")
    }
}
export const deleteById = async (id: number): Promise<boolean> => {
    try {
        const deletedPartyCount = await Party.destroy({
            where: {id}
        })
        return !!deletedPartyCount
    }
    catch(e) {
        throw new Error("Se produjo un error al eliminar el partido político")
    }
}
export const getAll = async (filters: FilterPartysDTO): Promise<PartyOuput[]> => {
    try {
        return Party.findAll({
            where: {
                ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
            },
            ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
        })
    }
    catch(e) {
        throw new Error("Se produjo un error al obtener los partidos políticos")
    }
}