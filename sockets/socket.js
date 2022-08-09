const { Client } = require('socket.io/dist/client');
const {io} = require('../index');
const Banda = require('../models/banda');
const Bandas = require('../models/Bandas');

//nueva instancia de bandas
const bandas = new Bandas();
bandas.addbanda(new Banda('Queen'));
bandas.addbanda(new Banda('BTS'));
bandas.addbanda(new Banda('BLACK PINK'));
bandas.addbanda(new Banda('JULION'));


//Mensaje socket
io.on('connection', client => {
    console.log('Cliente Conectado');

    client.emit('bandas-activas', bandas.getbandas());

    client.on('disconnect', () => {
        console.log('CLIENTE DESCONECTADO');
    });
    client.on('mensaje', (payload) =>{
        console.log('Mensaje', payload);

        io.emit('mensaje', {admin: 'Nuevo mensaje'});

    });

    //EVENTO VOTO DE LAS BANDAS
    client.on('votes-banda', (payload) =>{
        console.log(payload);
        
        //Accion de nuevo voto
        bandas.votosbanda(payload.id);

        //Generar notificacio de que ocurrio un cambio a todos los clientes
        io.emit('bandas-activas', bandas.getbandas());
        //io.emit('nuevo-mensaje', payload); //Emite a todos
        //client.broadcast.emit('nuevo-mensaje', payload); //emite a todos menos al que lo emitio
    });

    //EVENTO AGREGAR NUEVA BANDA
    client.on('add-banda', (payload) =>{
        console.log(payload);
        //creacion de instancia de nueva banda
        const newbanda = new Banda(payload.name);
        
        //Accion de nueva banda
        bandas.addbanda(newbanda);

        //Generar notificacio de que ocurrio un cambio a todos los clientes
        io.emit('bandas-activas', bandas.getbandas());
        //io.emit('nuevo-mensaje', payload); //Emite a todos
        //client.broadcast.emit('nuevo-mensaje', payload); //emite a todos menos al que lo emitio
    });
    //delete-banda
    //EVENTO ELIMACION DE BANDA
    client.on('delete-banda', (payload) =>{
        console.log(payload);
        
        //Accion de eliminar banda
        bandas.deletebanda(payload.id);

        //Generar notificacio de que ocurrio un cambio a todos los clientes
        io.emit('bandas-activas', bandas.getbandas());
        //io.emit('nuevo-mensaje', payload); //Emite a todos
        //client.broadcast.emit('nuevo-mensaje', payload); //emite a todos menos al que lo emitio
    });

    client.on('emitir-mensaje', (payload) =>{
        //console.log(payload);
        //io.emit('nuevo-mensaje', payload); //Emite a todos
        client.broadcast.emit('nuevo-mensaje', payload); //emite a todos menos al que lo emitio
    });
});