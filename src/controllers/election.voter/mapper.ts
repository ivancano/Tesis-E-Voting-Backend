
import { ElectionVoter } from '../../interfaces';
import { ElectionVoterOuput } from '../../models/election.voter';

export const toElectionVoter = (electionVoter: ElectionVoterOuput): ElectionVoter => {
    return {
        id: electionVoter.id,
        electionId: electionVoter.electionId,
        voterId: electionVoter.voterId,
        voted: electionVoter.voted,
        timestamp: electionVoter.timestamp,
        createdAt: electionVoter.createdAt,
        updatedAt: electionVoter.updatedAt,
        deletedAt: electionVoter.deletedAt,
    }
}