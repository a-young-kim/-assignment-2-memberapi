import express from 'express';

import mongoose_connect from '../../mongoose/index.js';
import Customer from '../../mongoose/schemas/customer.js';

const router = express.Router();

mongoose_connect();

router.get('/', async(req, res) => {
    const customers = await Customer.findOne({id:"ayoung"}).exec();
    console.log(customers);
    res.send(customers);
});

router.post('/insert', async(req, res) => {
    const result = await Customer.create(req.body.param);
    console.log(result);
    res.send(result);
});

export default router;