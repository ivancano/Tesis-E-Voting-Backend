import { Router, Request, Response} from 'express';
import { CreateElectionDTO, UpdateElectionDTO, FilterElectionsDTO } from '../dto/elections.dto';
import * as electionController from '../controllers/election';

const electionsRouter = Router()
electionsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const filters:FilterElectionsDTO = req.query
        const results = await electionController.getAll(filters)
        return res.status(200).send(results)
    }
    catch(e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
})
electionsRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const result = await electionController.getById(id)
        return res.status(200).send(result)
    }
    catch(e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
})
electionsRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const payload:UpdateElectionDTO = req.body
        const result = await electionController.update(id, payload)
        return res.status(201).send(result)
    }
    catch(e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
})
electionsRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const result = await electionController.deleteById(id)
        return res.status(204).send({
            success: result
        })
    }
    catch(e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
})
electionsRouter.post('/', async (req: Request, res: Response) => {
    try {
        const payload:CreateElectionDTO = req.body;
        const result = await electionController.create(payload);
        return res.status(200).send(result);
    }
    catch(e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
})

export default electionsRouter