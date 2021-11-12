
import { Candidate } from '../../interfaces';
import { CandidateOuput } from '../../models/candidate';

export const toCandidate = (candidate: CandidateOuput): Candidate => {
    return {
        id: candidate.id,
        name: candidate.name,
        lastname: candidate.lastname,
        partyId: candidate.partyId,
        party: candidate.Party,
        createdAt: candidate.createdAt,
        updatedAt: candidate.updatedAt,
        deletedAt: candidate.deletedAt,
    }
}