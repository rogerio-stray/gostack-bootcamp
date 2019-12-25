const express = require('express');

const server = express();

server.use(express.json());

const projects = [];
let count = 0;

function checkProject(req, res, next){

  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if(!project){
    return res.status(400).json({error: "Project not found"});
  }
  return next();
}

server.use((req, res, next) =>{
  count++;
  console.log(`O número de requisições chamadas foram: ${count}`);
  next();
  
});

server.get('/projects', (req, res) => {

  return res.json(projects);
});

server.put('/projects/:id', checkProject, (req, res) => {

  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);
  
  project.title = title; 

  return res.json(project);
});

server.post('/projects', (req, res) => {

  const { id, title} = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);
  return res.json(project);
});

server.post('/projects/:id/tasks', checkProject, (req, res) => {

const {id} = req.params;
const {title} = req.body;

const project = projects.find(p => p.id == id);

project.tasks.push(title);

return res.json(project);

});

server.delete('/projects/:id', checkProject, (req, res) =>{

  const { id } = req.param;

  const projectIndex = projects.findIndex(p => p.id == id);

  
  projects.splice(projectIndex, 1);
  return res.send();
});


server.listen(3000);