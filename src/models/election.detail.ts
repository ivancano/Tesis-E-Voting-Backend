import { Sequelize, DataTypes, Model, Optional, Association } from 'sequelize';
import { sequelize } from '../config/sequelize';

export interface ElectionDetailAttributes {
    id: number;
    electionId: number;
    partyId: number;
    candidateId: number;
    position: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface ElectionDetailInput extends Optional<ElectionDetailAttributes, 'id'> {}
export interface ElectionDetailOuput extends Required<ElectionDetailAttributes> {}

class ElectionDetail extends Model<ElectionDetailAttributes, ElectionDetailInput> implements ElectionDetailAttributes {
    public id!: number
    public electionId!: number
    public partyId!: number
    public candidateId!: number
    public position!: string

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

ElectionDetail.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        electionId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {model: 'elections', key:'id'},
            field: 'election_id'
        },
        partyId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {model: 'parties', key:'id'},
            field: 'party_id'
        },
        candidateId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {model: 'candidates', key:'id'},
            field: 'candidate_id'
        },
        position: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: true,
        sequelize,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    }
)

export default ElectionDetail