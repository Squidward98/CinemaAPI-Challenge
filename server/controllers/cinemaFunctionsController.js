const{ Controller }  = require('./controller');
const CinemaFunction = require('../models/cinemaFunctions');
const _ = require('underscore');

// ================================================

class CinemaFunctionController extends Controller {

    create() {

        let body = _.pick(this.req.body, [
            'name', 
            'movieRoom', 
            'status',
            'cinema',
            'movie', 
            'date',
            'time',
            'ticketPrice'
        ]);
        let cinemaFunction = new CinemaFunction(body);

        cinemaFunction.save((err, cinemaFunctionDB) => this._onModelFoundCallback(err, cinemaFunctionDB))
    }
    
    list() {
        this._modelFindAndPaginate(CinemaFunction, this.req.query.from, this.req.query.limit, (query) => {
            return query.populate('movieRoom', 'name capacity')
                .populate('cinema', 'name')
                .populate('movie', 'title')
                .sort('name'); 
        });
    }

    update() {
        let body = _.pick(this.req.body, ['name', 'movieRoom', 'status', 'cinema', 'movie', 'date', 'time', 'ticketPrice']);
        this._modelUpdate(CinemaFunction, this.req.params.id, body);
    }

    destroy() {
        this._modelSoftDelete(CinemaFunction, this.req.params.id);
    }
}

// =================================================

module.exports = {
    CinemaFunctionController
}