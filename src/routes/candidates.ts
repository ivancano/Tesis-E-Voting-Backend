import { Router, Request, Response} from 'express';
import { CreateCandidateDTO, UpdateCandidateDTO, FilterCandidatesDTO } from '../dto/candidates.dto';
import * as candidateController from '../controllers/candidate';

const candidatesRouter = Router()
candidatesRouter.get('/', async (req: Request, res: Response) => {
    try {
        const filters:FilterCandidatesDTO = req.query
        const results = await candidateController.getAll(filters)
        return res.status(200).send(results)
    }
    catch(e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
})
candidatesRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const result = await candidateController.getById(id)
        return res.status(200).send(result)
    }
    catch(e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
})
candidatesRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const payload:UpdateCandidateDTO = req.body
        const result = await candidateController.update(id, payload)
        return res.status(201).send(result)
    }
    catch(e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
})
candidatesRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const result = await candidateController.deleteById(id)
        return res.status(204).send({
            success: result
        })
    }
    catch(e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
})
candidatesRouter.post('/', async (req: Request, res: Response) => {
    try {
        const payload:CreateCandidateDTO = req.body;
        const result = await candidateController.create(payload);
        return res.status(200).send(result);
    }
    catch(e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
})

export default candidatesRouter