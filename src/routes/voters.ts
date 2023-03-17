import { Router, Request, Response} from 'express';
import multer from 'multer';
import { CreateVoterDTO, UpdateVoterDTO, FilterVotersDTO, LoginVotersDTO, ElectionVotersDTO, VoteBlockchainDTO } from '../dto/voter.dto';
import * as voterController from '../controllers/voter';
import path from 'path';

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
votersRouter.put('/:id', upload.fields([{name: 'dniFront', maxCount: 1}, {name: 'dniBack', maxCount: 1}]), async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const payload:UpdateVoterDTO = req.body
        const result = await voterController.update(id, payload, req.files)
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
votersRouter.post('/', upload.fields([{name: 'dniFront', maxCount: 1}, {name: 'dniBack', maxCount: 1}]), async (req: Request, res: Response) => {
    try {
        const payload:CreateVoterDTO = req.body;
        const result = await voterController.create(payload, req.files);
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
        const voter = await voterController.login(payload);
        console.log(voter)
        return res.status(200).send({voter});
    }
    catch(e) {
        console.log(e);
        return res.status(500).send(e);
    }
})
votersRouter.post('/batch', upload.single('file'), async (req: Request, res: Response) => {
    try {
        await voterController.createBatch(req.file);
        return res.status(200).send(true);
    }
    catch(e) {
        console.log(e);
        return res.status(500).send(e);
    }
})
votersRouter.get('/dni/:type/:filename', async (req: Request, res: Response) => {
    try {
        return res.sendFile(path.resolve(path.dirname(require.main.filename)+'/../assets/dni/'+req.params.type+'/'+req.params.filename))
    }
    catch(e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
})
votersRouter.post('/elections/:id', async (req: Request, res: Response) => {
    try {
        const payload: ElectionVotersDTO = req.body;
        const voter = await voterController.assignToElections(Number(req.params.id), payload);
        return res.status(200).send({voter});
    }
    catch(e) {
        console.log(e);
        return res.status(500).send(e);
    }
})
votersRouter.post('/vote', async (req: Request, res: Response) => {
    try {
        const payload:VoteBlockchainDTO = req.body;
        const result = await voterController.voteBlockchain(payload);
        return res.status(200).send(result);
    }
    catch(e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
})

export default votersRouter