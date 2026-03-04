const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

app.get('/saudacao',(req, res)=>{

    const nome = req.query.nome; 

    if(!nome){
        return res.status(400).json({error: 'Nome é obrigatório'})
    }

    res.json({message: `Olá, ${nome}!`});
});


app.post("/imc", (req, res)=>{
    const {nome, idade, peso, altura} = req.body;

    if(!nome || !idade || !peso || !altura){
        return res.status(400).json({error: 'Dados incompletos.'});
    }

    const imc = peso / (altura * altura);

    res.json({
        nome,
        imc: imc.toFixed(2)
    });
});

app.post("/media", (req, res)=>{
    const {nome, nota1, nota2} = req.body;

    if(!nome || !nota1 || !nota2){
        return res.status(400).json({error: 'Dados incompletos.'});
    }

    const media = (nota1 + nota2) / 2;

    if(media >= 7){
        return res.json({
            nome,
            media: media.toFixed(2),
            situacao: 'Aprovado'
        });
    }

    return res.json({
        nome,
        media: media.toFixed(2),
        situacao: 'Reprovado'
    });
});


app.listen(port, ()=>{
    console.log(`Servidor rodando em http://localhost:${port}`);
});