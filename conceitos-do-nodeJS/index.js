const express = require('express');

const server = express();

server.use(express.json());

const projetos = [
  {
    id:"0",
    title: 'Novo Projeto',
    tasks: []
  }
];
let count = 0;

function checkId(req, res, next){

  if(!req.id){
    return res.status(400).json({error: "This id does not exist"});
  }
  return next();
}

server.use((req, res, next) =>{
  count++;
  console.log(`O numero de requisicoes chamadas foi: ${count}`);
  next();
  
});

server.get('/projects', (req, res) => {

  return res.json(projetos);
});

server.put('/projects/:id', checkId, (req, res) => {

  const { id } = req.params;
  const { title } = req.body;

  projetos[id].title = title; 
  return res.json(projetos);
});

server.post('/projects', (req, res) => {

  const project = req.body;

  projetos.push(project);
  return res.json(projetos);
});

server.post('/projects/:id/tasks', checkId, (req, res) => {

const {id} = req.params;
const {title} = req.body;

projetos[id].tasks.push(title);
return res.json(projetos);

});

server.delete('/projects/:id', checkId, (req, res) =>{

  const { id } = req.param;
  
  projetos.splice(id, 1);
  return res.send();
});


server.listen(3000);