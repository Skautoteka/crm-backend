import express, { Request, Response } from 'express'
import { InvalidPayloadError } from '../error/invalid-payload';
import * as analysisController from '../controller/analysis-controller';

const router = express.Router();

router.get('/create-fields', async (req: Request, res: Response) => {
    const { type } = req.query;

    if(!type) {
        throw new InvalidPayloadError('Could not find type for the request');
    }

    let fields = null;

    if(type === 'report') {
        fields = await analysisController.getReportCreateFields();
    }

    if(type === 'note') {
        fields = await analysisController.getNoteCreateFields();
    }

    if(!fields) {
        throw new InvalidPayloadError('Could not create fields');
    }

    res.json(fields);
})

export { router as analysisRouter };