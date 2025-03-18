export class Station {

    /**
     * nom de la station
     * @type {string}
     */
    _name;

    /**
     * id de la station
     * @type {int}
     */
    _id;

    /**
     * quantité de denneigement
     * @type {float}
     */
    _airQuality;

    constructor(id, name, airQuality){
        this._id = id;
        this._name = name;
        this._airQuality = airQuality;
    }

    /**
     * @returns {string}
     */
    get name(){
        return this._name;
    }


    /**
     * @returns {int}
     */
    get id(){
        return this._id;
    }

    /**
     * @param {float} airQuality
     */
    set airQuality(airQuality){
        this._airQuality = airQuality;
    }

    getHtmlRehcerche(){
        return '<a class="station" id="'+this._id+'">'+this._name+'<span>'+this._airQuality+'</span></div>';
    }
}