const{ Controller }  = require('./controller');
const bcrypt = require('bcrypt');
const User = require('../models/users');
const _ = require('underscore');

// ================================================

class UserController extends Controller {

    create() {

        let body = _.pick(this.req.body, ['name', 'lastname', 'email', 'password', 'role']);
        body.password = bcrypt.hashSync(body.password, 10);
        let user = new User(body);

        console.log(user);

        user.save((err, userDB) => this._genericResponse(err, userDB));
        
    }
    
    list() {
        this._modelFindAndPaginate(User, this.req.query.from, this.req.query.limit, (query) => {
            return query.populate()
        });
    }

    show() {
        this._modelFind(User, this.req.params.id);
    }

    update() {
        let body = _.pick(this.req.body, ['name', 'lastname', 'email', 'password', 'img', 'role', 'status']);
        this._modelUpdate(User, this.req.params.id, body);
    }

    destroy() {
        this._modelSoftDelete(User, this.req.params.id);
    }
}

// =================================================

module.exports = {
    UserController
}