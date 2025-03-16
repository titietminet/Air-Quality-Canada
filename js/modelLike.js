export class Like {

    /**
     * nom de la station
     * @type {string}
     */
    _name;

    /**
     * id de la station
     * @type {string}
     */
    _id;

    /**
     * quantité d'enneigement
     * @type {number}
     */
    _enneigement;

    /**
     * quantité de denneigement
     * @type {number}
     */
    _denneigement;

    /**
     * praticabilité autour de la station
     * @type {boolean}
     */
    _praticable;

    constructor(name, enneigement, denneigement){
        this._name = name;
        this._enneigement = enneigement;
        this._denneigement = denneigement;
        if(this._enneigement < this._denneigement){
            this._praticable = true;
        }
    }

    /**
     * @returns {string}
     */
    get name(){
        return this._name;
    }

    /**
     * @returns {number}
     */
    get enneigement(){
        return this._enneigement;
    }  

    /**
     * @returns {number}
     */
    get denneigement(){
        return this._denneigement;
    }

    /**
     * @returns {boolean}
     */
    get praticable(){
        return this._praticable;
    }

    /**
     * @returns {string}
     */
    get id(){
        return this._id;
    }

    /**
     * @param {number} enneigement
     */
    set enneigement(enneigement){
        this._enneigement = enneigement;
        if(this._enneigement < this._denneigement){
            praticable(true);
        } else {
            praticable(false);
        }   
    }

    /**
     * @param {number} denneigement
     */
    set denneigement(denneigement){
        this._denneigement = denneigement;
        if(this._enneigement < this._denneigement){
            praticable(true);
        } else {
            praticable(false);
        }
    }

    /**
     * @param {boolean} praticable
     */
    set praticable(praticable){
        this._praticable = praticable;
    }
}