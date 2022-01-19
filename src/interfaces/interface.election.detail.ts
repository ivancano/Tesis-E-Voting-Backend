import Election from "../models/election";
import Candidate from "../models/candidate";
import Party from "../models/party";

export interface ElectionDetail {
    id: number
    electionId: number,
    election: Election,
    partyId: number,
    candidateId: number,
    party?: Party,
    candidate?: Candidate,
    position: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt?: Date
}