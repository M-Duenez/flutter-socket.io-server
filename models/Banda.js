const { v4: uuidV4 } = require('uuid');

class Banda{

    constructor(name = 'no-name'){
        
        this.id = uuidV4();//creacion de identificador unico
        this.name = name;
        this.votes = 0;

    }

}

module.exports = Banda;