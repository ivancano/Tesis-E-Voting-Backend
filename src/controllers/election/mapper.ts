
import { Election } from '../../interfaces';
import { ElectionOuput } from '../../models/election';

export const toElection = (election: ElectionOuput): Election => {
    return {
        id: election.id,
        name: election.name,
        description: election.description,
        startTime: election.startTime,
        endTime: election.endTime,
        status: election.status,
        createdAt: election.createdAt,
        updatedAt: election.updatedAt,
        deletedAt: election.deletedAt,
    }
}