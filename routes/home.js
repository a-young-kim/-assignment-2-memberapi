import express from 'express';
import fs from 'fs';

const router = express.Router();

// get
router.get('/', function(req, res){
    fs.readFile('./views/home.html', function(err, data){
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

router.post('/', function(req, res){
    if(req.session.loginData != undefined){
        res.json({
            message: 'login',
            id: req.session.loginData,
    });
    }

    else{
        res.json({message: 'unlogin'});
    }
});

router.post('/logout', function(req, res){
   req.session.destroy(error => {if(error) console.log(error);});
   res.redirect("/");
});

export default router;