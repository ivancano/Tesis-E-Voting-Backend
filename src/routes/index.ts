import { Router } from 'express'
import partiesRouter from './parties'

const router = Router()

router.use('/parties', partiesRouter)

export default router