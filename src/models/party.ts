import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/sequelize';

export interface PartyAttributes {
    id: number;
    name: string;
    status: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface PartyInput extends Optional<PartyAttributes, 'id'> {}
export interface PartyOuput extends Required<PartyAttributes> {}

class Party extends Model<PartyAttributes, PartyInput> implements PartyAttributes {
    public id!: number
    public name!: string
    public status!: boolean

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Party.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
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
        tableName: 'parties'
    }
)

export default Party