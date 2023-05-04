import express from 'express';
import {Server} from 'socket.io';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';

const app = express();

app.use(express.static(`${__dirname}/public`));
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');
app.use('/',viewsRouter);



const server = app.listen(8080, ()=>console.log('Server running at port 8080'));
const io = new Server(server);

const messages = [];
io.on('connection', socket =>{
    console.log('Nuevo cliente conectado');
    socket.on('message', data=>{
        messages.push(data);
        io.emit('messageLogs', messages);
    });
    socket.on('authenticated', data=>{
        socket.emit('messageLogs', messages); //usamos socket.emit porque solo queremos q le llegue al usuario q se acaba de conectar
        socket.broadcast.emit('newUserConnected', data); //broadcast les llega a todos menos al q se acaba de conectar
    });
});