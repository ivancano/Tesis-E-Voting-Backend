import { Router, Request, Response, response} from 'express';
import { CreatePartyDTO, UpdatePartyDTO, FilterPartysDTO } from '../dto/parties.dto';
import * as partyController from '../controllers/party';

const partiesRouter = Router()
partiesRouter.get('/', async (req: Request, res: Response) => {
    try {
        const filters:FilterPartysDTO = req.query
        const results = await partyController.getAll(filters)
        return res.status(200).send(results)
    }
    catch(e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
})
partiesRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const result = await partyController.getById(id)
        return res.status(200).send(result)
    }
    catch(e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
})
partiesRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const payload:UpdatePartyDTO = req.body
        const result = await partyController.update(id, payload)
        return res.status(201).send(result)
    }
    catch(e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
})
partiesRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const result = await partyController.deleteById(id)
        return res.status(204).send({
            success: result
        })
    }
    catch(e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
})
partiesRouter.post('/', async (req: Request, res: Response) => {
    try {
        const payload:CreatePartyDTO = req.body;
        const result = await partyController.create(payload);
        return res.status(200).send(result);
    }
    catch(e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
})
partiesRouter.post('/import', async (req: Request, res: Response) => {
    try {
        // console.log(req.files);
        return res.status(200).send(true);
    }
    catch(e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
})

export default partiesRouter