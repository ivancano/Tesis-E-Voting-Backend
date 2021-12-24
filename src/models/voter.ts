import { Sequelize, DataTypes, Model, Optional, Association } from 'sequelize';
import { sequelize } from '../config/sequelize';

export interface VoterAttributes {
    id: number;
    name: string;
    lastname: string;
    dni: string;
    status: boolean;
    pin: string;
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

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
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
            allowNull: false
        },
        pin: {
            type: DataTypes.STRING,
            allowNull: false
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

export default Voter