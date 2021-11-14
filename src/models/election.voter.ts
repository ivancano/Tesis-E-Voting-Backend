import { Sequelize, DataTypes, Model, Optional, Association } from 'sequelize';
import { sequelize } from '../config/sequelize';

export interface ElectionVoterAttributes {
    id: number;
    electionId: number;
    voterId: number;
    timestamp: Date;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface ElectionVoterInput extends Optional<ElectionVoterAttributes, 'id'> {}
export interface ElectionVoterOuput extends Required<ElectionVoterAttributes> {}

class ElectionVoter extends Model<ElectionVoterAttributes, ElectionVoterInput> implements ElectionVoterAttributes {
    public id!: number
    public electionId!: number
    public voterId!: number
    public timestamp!: Date

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

ElectionVoter.init(
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
        voterId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {model: 'voters', key:'id'},
            field: 'voter_id'
        },
        timestamp: {
            type: DataTypes.DATE,
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
        tableName: 'election_voter'
    }
)

export default ElectionVoter