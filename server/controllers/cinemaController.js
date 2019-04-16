const{ Controller }  = require('./controller');
const Cinema = require('../models/cinemas');
const _ = require('underscore');

// ================================================

class CinemaController extends Controller {

    create() {

        let body = _.pick(this.req.body, [
            'name', 
            'status',
            'movieRooms',  
            'movies'
        ]);
        let cinema = new Cinema(body);

        cinema.save((err, cinemaDB) => this._onModelFoundCallback(err, cinemaDB));
    }
    
    list() {
        this._modelFindAndPaginate(Cinema, this.req.query.from, this.req.query.limit, (query) => {
            return query.populate('movieRooms', 'capacity name')
                .populate('movies', 'title category classificationByAge movieDirector status')
                .sort('name');
        });
    }

    update() {
        let body = _.pick(this.req.body, ['name', 'status', 'movieRooms', 'movies']);
        console.log(body);
        this._modelUpdate(Cinema, this.req.params.id, body);
    }

    destroy() {
        this._modelSoftDelete(Cinema, this.req.params.id);
    }
}

// =================================================

module.exports = {
    CinemaController
}