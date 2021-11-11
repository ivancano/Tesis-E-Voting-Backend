import { Router, Request, Response} from 'express';
import { CreateElectionVoterDTO, UpdateElectionVoterDTO, FilterElectionVotersDTO } from '../dto/elections.voter.dto';
import * as electionVoterController from '../controllers/election.voter';

const electionVotersRouter = Router()
electionVotersRouter.get('/', async (req: Request, res: Response) => {
    try {
        const filters:FilterElectionVotersDTO = req.query
        const results = await electionVoterController.getAll(filters)
        return res.status(200).send(results)
    }
    catch(e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
})
electionVotersRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const result = await electionVoterController.getById(id)
        return res.status(200).send(result)
    }
    catch(e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
})
electionVotersRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const payload:UpdateElectionVoterDTO = req.body
        const result = await electionVoterController.update(id, payload)
        return res.status(201).send(result)
    }
    catch(e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
})
electionVotersRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const result = await electionVoterController.deleteById(id)
        return res.status(204).send({
            success: result
        })
    }
    catch(e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
})
electionVotersRouter.post('/', async (req: Request, res: Response) => {
    try {
        const payload:CreateElectionVoterDTO = req.body;
        const result = await electionVoterController.create(payload);
        return res.status(200).send(result);
    }
    catch(e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
})

export default electionVotersRouter