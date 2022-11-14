import express from 'express';
import fs from 'fs';
import request from 'request';
import crypto from 'crypto';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const router = express.Router();

dotenv.config();

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

    const options = {
        uri:'http://localhost:80/api/customers/checkId', 
        method: 'POST',
        form: {
            id: check_id
        }    
    };

    request.post(options, function(err, httpResponse, body){
        body = JSON.parse(body);
        
        if(body == null){
            res.status(200).json({
                message: "존재하지 않는 아이디입니다.",
            });
        }

        else{
            const get_password = body.password;
            const get_salt = body.salt;

            const sal_password = crypto.pbkdf2Sync(check_password, get_salt, 1, 32, 'sha512').toString('base64');
           
            if(sal_password == get_password){
                const key = process.env.SECRET_KEY;
                let token = "";

                token = jwt.sign(
                    {
                        type: 'JWT',
                        id: check_id,
                        password: sal_password,
                    },
                    key,
                    {
                        expiresIn: "15m", // 15분후 만료
                        issuer: "토큰발급자",
                    }
                );
                
                req.session.loginData = check_id;
                req.session.save(error => {if(error) console.log(error);});

                res.status(200).json({
                    message: "로그인에 성공했습니다.",
                    token: token,
                    id: check_id
                });
            }
            else{
                res.status(200).json({
                    message: "비밀번호가 일치하지 않습니다.",
                });
            }
        }
    });
});



export default router;