import {Router} from 'express';

const router = Router();

router.get('/', (req,res)=>{
    res.render('index'); //va por parametro el nombre de la vista
});

export default router;