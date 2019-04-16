class Controller {

    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    _badRequest() {
        return this.res.status(400).json({
            err: {
                message: 'Bad request.'
            }
        });
    }

    _notFound() {
        return this.res.status(404).json({
            err: {
                message: 'Resource not found.'
            }
        });
    }

    _serverError() {
        return this.res.status(500).json({
            err: {
                message: 'Server error.'
            }
        });
    }

    _genericErrorRes(err, modelDB){
        if(err) {
            return this._badRequest();
        }

        if(!modelDB) {
            return this._notFound();
        }

        if(modelDB.status !== false) {
                this.res.json(modelDB);
        } else {
            return this.res.json({
                elementDB: 'not available',
                status: false
            })
        }  
    }

    _genericResponse(err, modelDB) {
        if(err) {
            return this._badRequest();
        }

        if(!modelDB) {
            return this._notFound();
        }
        
        if(modelDB.status !== false) {
                this.res.json(modelDB);
        } else {
            return this.res.json({
                elementDB: 'not available',
                status: false
            })
        }  
    }

    _modelFindByIdAndUpdate(model, id, body, runValidators = false, callback = null) {
        model.findByIdAndUpdate(id, body, { new: true, runValidators }, (err, modelDB) => {
            this._genericResponse(err, modelDB, callback);
        });
    }

    _modelUpdate(model, id, body, callback = null) {
        this._modelFindByIdAndUpdate(model, id, body, true, callback);
    }

    _modelSoftDelete(model, id) {
        this._modelFindByIdAndUpdate(model, id, {status: false});
    }

    _modelFind(model, id) {
        model.findById(id, (err, modelDB) =>{
            this._genericResponse(err, modelDB);
        });
    }

    _modelFindAndPaginate(model, from = 0, limit = 5, populateCallback = null) {
        from = Number(from) || 0;
        limit = Number(limit) || 5;

        let query = model.find({ status: true })
            .skip(from)
            .limit(limit);

        if (populateCallback) {
            query = populateCallback(query);
        }

        query.exec((err, modelsDB) => {
                if(err) {
                    return this._badRequest();
                }

                this._modelCount(model, (count) => {
                    this.res.json({data: modelsDB, count});
                })
            });
    }

    _modelCount(model, callback) {
        model.countDocuments({ status: true }, (err, count) => {
            if(err) {
                return this._badRequest();
            }
            callback(count);
        });
    }
}

// =================================================

module.exports = {
    Controller
}