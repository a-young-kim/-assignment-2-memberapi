import express from 'express';

import mongoose_connect from '../../mongoose/index.js';
import Customer from '../../mongoose/schemas/customer.js';

const router = express.Router();

mongoose_connect();

router.get('/', async(req, res) => {
    const customers = await Customer.findOne({login_id: "sumin"}).exec();//,{projection:{customers: -1}}
    console.log(customers);
    res.send(customers);
});

router.post('/insert', async(req, res) => {

    const customers = await Customer.findOne({login_id: req.body.login_id}).exec();
    
    if(customers == null){
        const result = await Customer.create(req.body);
        res.send(result);
    }
    else{
        res.send("");
    }
});

router.post('/checkId', async(req, res) => {
    let check_id = req.body.id;

    const customers = await Customer.findOne({login_id : check_id}).exec();
    
    res.send(JSON.stringify(customers));
    
});

export default router;