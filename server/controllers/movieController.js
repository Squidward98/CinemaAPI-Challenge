const{ Controller }  = require('./controller');
const Movie = require('../models/movies');
const _ = require('underscore');

// ================================================

class MovieController extends Controller {

    create() {

        let body = _.pick(this.req.body, [
            'title', 
            'synopsis', 
            'movieDirector', 
            'cast', 
            'classificationByAge', 
            'status', 
            'category'
        ]);
        let movie = new Movie(body);

        movie.save((err, userDB) => this._onModelFoundCallback(err, userDB));
    }
    
    list() {
        this._modelFindAndPaginate(Movie, this.req.query.from, this.req.query.limit, (query) => {
            return query;
        });
    }

    show() {
        this._modelFind(Movie, this.req.params.id);
    }

    update() {
        let body = _.pick(this.req.body, ['title', 'synopsis', 'movieDirector', 'cast', 'classificationByAge', 'status', 'category']);
        this._modelUpdate(Movie, this.req.params.id, body);
    }

    destroy() {
        this._modelSoftDelete(Movie, this.req.params.id);
    }
}

// =================================================

module.exports = {
    MovieController
}