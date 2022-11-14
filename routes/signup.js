import express from 'express';
import fs from 'fs';
import request from 'request';
import crypto from 'crypto';

const host = '34.193.68.110';
//const host = 'localhost:3000';
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

router.post('/', async function(req, res){
    const body = req.body;
    const password = body.password;
    
    const new_salt = crypto.randomBytes(32).toString('base64');
    const new_password = crypto.pbkdf2Sync(password, new_salt, 1, 32, 'sha512').toString('base64');

    const options = {
        uri:'http://'+ host +'/api/customers/insert', 
        method: 'POST',
        form: {
          login_id: body.login_id,
          password: new_password,
          salt: new_salt,
        }
    };
    

    request.post(options, function(err, httpResponse, body){
        
        if(body == ""){
            res.send("");
        }
        else{
            res.send("login");
        }
        
    });
});

export default router;