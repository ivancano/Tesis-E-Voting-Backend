
import { Voter } from '../../interfaces';
import { VoterOuput } from '../../models/voter';

export const toVoter = (voter: VoterOuput): Voter => {
    return {
        id: voter.id,
        name: voter.name,
        lastname: voter.lastname,
        dni: voter.dni,
        status: voter.status,
        createdAt: voter.createdAt,
        updatedAt: voter.updatedAt,
        deletedAt: voter.deletedAt,
        pin: voter.pin
    }
}