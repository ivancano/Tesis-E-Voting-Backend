import { Router, Request, Response} from 'express';
import multer from 'multer';
import { CreateVoterDTO, UpdateVoterDTO, FilterVotersDTO, LoginVotersDTO } from '../dto/voter.dto';
import * as voterController from '../controllers/voter';

const votersRouter = Router()
const upload = multer({ dest: 'tmp/csv/' });
votersRouter.get('/', async (req: Request, res: Response) => {
    try {
        const filters:FilterVotersDTO = req.query
        const results = await voterController.getAll(filters)
        return res.status(200).send(results)
    }
    catch(e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
})
votersRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const result = await voterController.getById(id)
        return res.status(200).send(result)
    }
    catch(e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
})
votersRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const payload:UpdateVoterDTO = req.body
        const result = await voterController.update(id, payload)
        return res.status(201).send(result)
    }
    catch(e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
})
votersRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const result = await voterController.deleteById(id)
        return res.status(204).send({
            success: result
        })
    }
    catch(e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
})
votersRouter.post('/', async (req: Request, res: Response) => {
    try {
        const payload:CreateVoterDTO = req.body;
        const result = await voterController.create(payload);
        return res.status(200).send(result);
    }
    catch(e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
})
votersRouter.post('/login', async (req: Request, res: Response) => {
    try {
        const payload: LoginVotersDTO = req.body;
        const result = await voterController.login(payload);
        return res.status(200).send({validation: result});
    }
    catch(e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
})
votersRouter.post('/batch', upload.single('file'), async (req: Request, res: Response) => {
    try {
        const result = await voterController.createBatch(req.file);
        return res.status(200).send(true);
    }
    catch(e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
})

export default votersRouter