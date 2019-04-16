const{ Controller }  = require('./controller');
const CinemaRoom = require('../models/cinemaRooms');
const _ = require('underscore');

// ================================================

class CinemaRoomController extends Controller {

    create() {
        let body = _.pick(this.req.body, [
            'name',
            'capacity',
            'status',
            'movies',
            'cinema' 
        ]);
        let cinemaRoom = new CinemaRoom(body);

        cinemaRoom.save((err, roomDB) => this._onModelFoundCallback(err, roomDB))
    }
    
    list() {
        this._modelFindAndPaginate(CinemaRoom, this.req.query.from, this.req.query.limit, (query) => {
            return query.populate('movies', 'title synopsis classificationByAge category')
                .populate('cinema', 'name')
                .sort('name');
        });
    }

    update() {
        let body = _.pick(this.req.body, ['name', 'capacity', 'status', 'movies', 'cinemas']);
        this._modelUpdate(CinemaRoom, this.req.params.id, body);
    }

    destroy() {
        this._modelSoftDelete(CinemaRoom, this.req.params.id);
    }
}

// =================================================

module.exports = {
    CinemaRoomController
}