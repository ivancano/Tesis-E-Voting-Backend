import { Router } from 'express'
import partiesRouter from './parties'
import candidatesRouter from './candidates'
import votersRouter from './voters'
import electionDetailsRouter from './election.details'
import electionsRouter from './elections'
import electionVotersRouter from './election.voters'

const router = Router()

router.use('/parties', partiesRouter)
router.use('/candidates', candidatesRouter)
router.use('/voters', votersRouter)
router.use('/elections', electionsRouter)
router.use('/election-details', electionDetailsRouter)
router.use('/election-voters', electionVotersRouter)

export default router