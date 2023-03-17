import { Sequelize, DataTypes, Model, Optional, Association } from 'sequelize';
import { sequelize } from '../config/sequelize';
import bcrypt from 'bcrypt';
import ElectionVoter from './election.voter';

export interface VoterAttributes {
    id: number;
    name: string;
    lastname: string;
    dni: string;
    status: boolean;
    pin: string;
    dniFront: string;
    dniBack: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;

}

export interface VoterInput extends Optional<VoterAttributes, 'id'> {}
export interface VoterOuput extends Required<VoterAttributes> {}

class Voter extends Model<VoterAttributes, VoterInput> implements VoterAttributes {
    public id!: number
    public name!: string
    public lastname!: string
    public dni!: string
    public status!: boolean
    public pin!: string
    public dniFront!: string
    public dniBack!: string

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
    static batchProcess(values: any[]) : Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                await sequelize.transaction(async t => {
                    for(const value of values) {
                        await Voter.create({
                            name: value.name,
                            lastname: value.lastname,
                            dni: value.dni,
                            status: value.status,
                            pin: await bcrypt.hash('123456', 10),
                            dniFront: value.dniFront,
                            dniBack: value.dniBack
                        }, {transaction: t})
                    }
                })
                resolve(true);
            }
            catch(error) {
                reject(false);
            }
        })
    }
}

Voter.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dni: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        pin: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dniFront: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'dni_front'
        },
        dniBack: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'dni_back'
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        timestamps: true,
        sequelize,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        tableName: 'voters'
    }
)

Voter.hasMany(ElectionVoter, {foreignKey: 'voterId'})

export default Voter