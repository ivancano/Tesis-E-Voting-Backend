
import { Party } from '../../interfaces';
import { PartyOuput } from '../../models/party';

export const toParty = (party: PartyOuput): Party => {
    return {
        id: party.id,
        name: party.name,
        status: party.status,
        createdAt: party.createdAt,
        updatedAt: party.updatedAt,
        deletedAt: party.deletedAt,
    }
}