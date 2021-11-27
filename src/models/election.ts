import { Sequelize, DataTypes, Model, Optional, Association } from 'sequelize';
import { sequelize } from '../config/sequelize';

export interface ElectionAttributes {
    id: number;
    name: string;
    description: string;
    startTime: Date;
    endTime: Date;
    status: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface ElectionInput extends Optional<ElectionAttributes, 'id'> {}
export interface ElectionOuput extends Required<ElectionAttributes> {}

class Election extends Model<ElectionAttributes, ElectionInput> implements ElectionAttributes {
    public id!: number
    public name!: string
    public description!: string
    public startTime!: Date
    public endTime!: Date
    public status!: boolean

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Election.init(
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
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        startTime: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'start_time'
        },
        endTime: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'end_time'
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
        tableName: 'elections'
    }
)

export default Election