import { Sequelize, DataTypes, Model, Optional, Association } from 'sequelize';
import { sequelize } from '../config/sequelize';
import Party from './party';

export interface CandidateAttributes {
    id: number;
    name: string;
    lastname: string;
    partyId: number;
    Party?: Party
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface CandidateInput extends Optional<CandidateAttributes, 'id'> {}
export interface CandidateOuput extends Optional<CandidateAttributes, 'id'> {}

class Candidate extends Model<CandidateAttributes, CandidateInput> implements CandidateAttributes {
    public id!: number
    public name!: string
    public lastname!: string
    public partyId!: number
    public status!: boolean

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Candidate.init(
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
        partyId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {model: 'parties', key:'id'},
            field: 'parties_id'
        }
    },
    {
        timestamps: true,
        sequelize,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        tableName: 'candidates'
    }
)

Candidate.belongsTo(Party, {foreignKey: 'partyId'});

export default Candidate