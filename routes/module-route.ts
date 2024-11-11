import express, { Request, Response } from 'express';


const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    res.json([
        { label: 'Zadania', icon: 'move-task', route: 'tasks' },
        { label: 'Raporty', icon: 'file-document', route: 'reports' },
        { label: 'Zawodnicy', icon: 'user', route: 'players' },
        { label: 'Drużyny', icon: 'organisation', route: 'teams' },
        { label: 'Analiza', icon: 'chart', route: 'analysis' },
        { label: 'Użytkownicy', icon: 'user-list', route: 'users' }
    ])
})

export { router as moduleRouter }