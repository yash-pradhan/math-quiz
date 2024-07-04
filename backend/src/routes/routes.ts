import express, { Request, Response } from 'express';
import User from '../models/user.ts';
import UserScore from '../models/userScore.ts';

const router = express.Router();

router.get('/', (res: Response) => {
    res.send('Hello, world!');
});

// GET /api/users
router.get('/users', async (res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/users
router.post('/createuser', async (req: Request, res: Response) => {
    try {
        console.log('Creating user:', req.body)
        const { username, password } = req.body;
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/loginuser', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        // console.log(req.body);
        const user = await User.findOne({ username, password });
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ error: 'User not found' });
        }

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Server error' });

    }

});

router.post('/storescore', async (req: Request, res: Response) => {

    try {
        const { username, score, operator } = req.body;
        console.log(req.body);
        const user = await User.findOne({ username });

        if (user) {
            let update = {};
            const filter = { userId: user._id };
            if (operator === '+') {
                update = { $push: { additionScore: score } }
            } else if (operator === '-') {
                update = { $push: { subtractionScore: score } }
            } else if (operator === '*') {
                update ={ $push: { multiplicationScore: score } }
            } else if (operator === '/') {
                update =  { $push: { divisionScore: score } }
            }
            ;
            const options = { new: true, upsert: true }; // upsert option will create the document if it doesn't exist

            const userScore = await UserScore.findOneAndUpdate(filter, update, options);

            res.status(201).json(userScore);
        }
        else {
            res.status(404).json({ error: 'User not found' });
        }


    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Server error' });
    }

});

router.get('/score', async (req: Request, res: Response) => {
    try {
        const { username } = req.query;
        const user = await User.findOne({ username });
        if (user) {

            const score = await UserScore.findOne({ userId: user._id });
            console.log(score);
            res.status(201).json(score);
        }
    } catch {
        res.status(404).json({ error: 'User not found' });
    }
})

export default router;
