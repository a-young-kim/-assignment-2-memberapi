import express from 'express';
import fs from 'fs';

const router = express.Router();

// get
router.get('/', function(req, res){
    fs.readFile('./views/signup.html', function(err, data){
        if(err){
            res.send('에러');
        }
        else{
            res.writeHead(200, {'Content-Type': 'index.html'});
            res.write(data);
            res.end();
        }
    });
});

export default router;