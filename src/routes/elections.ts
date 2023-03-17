import { Router, Request, Response} from 'express';
import multer from 'multer';
import { CreateElectionDTO, UpdateElectionDTO, FilterElectionsDTO } from '../dto/elections.dto';
import * as electionController from '../controllers/election';

const electionsRouter = Router()
const upload = multer({ dest: 'tmp/csv/' });
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
electionsRouter.get('/acta-escrutinio/:id', async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const result = await electionController.getActaEscrutinio(id);
        const PDFDocument =  require('pdfkit');
        const myDoc = new PDFDocument({bufferPages: true});
        const buffers: any[] = [];
        myDoc.on('data', buffers.push.bind(buffers));
        myDoc.on('end', () => {

            const pdfData = Buffer.concat(buffers);
            res.writeHead(200, {
            'Content-Length': Buffer.byteLength(pdfData),
            'Content-Type': 'application/pdf',
            'Content-disposition': 'inline;filename=acta-escrutinio.pdf',})
            .end(pdfData);

        });
        const list = []
        const positions = Object.keys(result);
        for(const p of positions) {
            myDoc.font('Times-Roman')
                .fontSize(40)
                .text(`Acta de Escrutinio`)
                .fontSize(18)
                .moveDown()
                .text(`Cargo: ${p}`)
                .moveDown()
                .moveDown()
                .moveDown()
                .text(`Resultados:`);
            for(const r of result[p]) {
                list.push(`Candidato: ${r.candidate.name} ${r.candidate.lastname} (${r.party.name}) - Votos: ${r.votes}`);
            }
        }
        myDoc.list(list)
        myDoc.end();
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
electionsRouter.post('/batch', upload.single('file'), async (req: Request, res: Response) => {
    try {
        const result = await electionController.createBatch(req.file);
        return res.status(200).send(true);
    }
    catch(e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
})
electionsRouter.get('/vote-counter/:id', async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const result = await electionController.getVoteCounter(id)
        return res.status(200).send(result)
    }
    catch(e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
})
electionsRouter.get('/vote-counter/:id/detail/:candidateId', async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const candidateId = Number(req.params.candidateId)
        const result = await electionController.getVoteCounterDetail(id, candidateId)
        return res.status(200).send(result)
    }
    catch(e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
})

export default electionsRouter