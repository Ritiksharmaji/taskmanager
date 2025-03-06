step-1: npx create-react-app frontend_taskmanager
step-2: npm install react-router-dom axios

"axios": "^1.8.1",
"react": "^19.0.0",
"react-dom": "^19.0.0",
"react-router-dom": "^7.2.0",
"react-scripts": "5.0.1",
"web-vitals": "^2.1.4"


## ------------ face proble:
1) while matcing the id to update the task here we are using he useParam() which return the string type data so we are passing the id from dashbord to update componet for task using usrParam() which is string  type not int and i was try to match but it was not matched so i convetrd it into number then i comapred then i got the respected output....
const taskId = Number(id);
const existingTask = tasks.find((task) => task.id === taskId);

## install the notification 
npm install react-toastify

