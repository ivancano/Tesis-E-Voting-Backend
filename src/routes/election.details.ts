import { Router, Request, Response} from 'express';
import { CreateElectionDetailDTO, UpdateElectionDetailDTO, FilterElectionDetailsDTO } from '../dto/elections.detail.dto';
import * as electionDetailController from '../controllers/election.detail';

const electionDetailsRouter = Router()
electionDetailsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const filters:FilterElectionDetailsDTO = req.query
        const results = await electionDetailController.getAll(filters)
        return res.status(200).send(results)
    }
    catch(e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
})
electionDetailsRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const result = await electionDetailController.getById(id)
        return res.status(200).send(result)
    }
    catch(e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
})
electionDetailsRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const payload:UpdateElectionDetailDTO = req.body
        const result = await electionDetailController.update(id, payload)
        return res.status(201).send(result)
    }
    catch(e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
})
electionDetailsRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const result = await electionDetailController.deleteById(id)
        return res.status(204).send({
            success: result
        })
    }
    catch(e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
})
electionDetailsRouter.post('/', async (req: Request, res: Response) => {
    try {
        const payload:CreateElectionDetailDTO = req.body;
        const result = await electionDetailController.create(payload);
        return res.status(200).send(result);
    }
    catch(e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
})

export default electionDetailsRouter