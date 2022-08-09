const { v4: uuidV4 } = require('uuid');
const Banda = require('./banda');

class Bandas{

    constructor(){
        
        //this.id = uuidV4();//creacion de identificador unico
        this.bandas = [];

    }

    addbanda(banda = new Banda()){
        this.bandas.push(banda);
    }

    getbandas(){
        return this.bandas;
    }

    deletebanda(id = ''){
        this.bandas = this.bandas.filter(banda => banda.id != id);
        return this.bandas;
    }

    votosbanda(id = ''){
        this.bandas = this.bandas.map(banda =>{
            if(banda.id === id){
                banda.votes ++;
                return banda;

            }
            else{
                return banda;
            }
        })
    }

}

module.exports = Bandas;