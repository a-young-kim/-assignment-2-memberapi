import express from 'express';
import fs from 'fs';
import request from 'request';
import crypto from 'crypto';

const router = express.Router();

// get
router.get('/', function(req, res){
    fs.readFile('./views/index.html', function(err, data){
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

router.post('/', async(req, res) => {
    const check_id = req.body.id;
    const check_password =req.body.password;

    console.log(check_password);
    const options = {
        uri:'http://localhost:3000/api/customers/checkId', 
        method: 'POST',
        form: {
            id: check_id
        }    
    };

    request.post(options, function(err, httpResponse, body){
        body = JSON.parse(body);
        
        if(body == null){
            res.send("<script>alert('존재하지 않는 아이디입니다.');location.href=document.referrer;</script>");
        }

        else{
            const get_password = body.password;
            const get_salt = body.salt;

            const sal_password = crypto.pbkdf2Sync(check_password, get_salt, 1, 32, 'sha512').toString('base64');
           
            if(sal_password == get_password){
                console.log('b');
            }
            else{
                console.log('c');
            }
            res.redirect('/');
        }
    });
});

export default router;