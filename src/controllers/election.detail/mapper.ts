
import { ElectionDetail } from '../../interfaces';
import { ElectionDetailOuput } from '../../models/election.detail';

export const toElectionDetail = (electionDetail: ElectionDetailOuput): ElectionDetail => {
    return {
        id: electionDetail.id,
        electionId: electionDetail.electionId,
        partyId: electionDetail.partyId,
        candidateId: electionDetail.candidateId,
        position: electionDetail.position,
        createdAt: electionDetail.createdAt,
        updatedAt: electionDetail.updatedAt,
        deletedAt: electionDetail.deletedAt,
    }
}