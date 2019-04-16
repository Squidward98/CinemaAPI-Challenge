const { authenticateToken, verifyAdmin_Role } = require('../middlewares/authentications');

// =================================================

class RouteRegisterer {

    constructor(app) {
        this.app = app;
        this.routeDefinitions = [
            {
                httpVerb: 'get',
                controllerMethod: 'list',
                suffix: '',
                middlewares: [authenticateToken],
            },
            {
                httpVerb: 'get',
                controllerMethod: 'show',
                suffix: '',
                middlewares: [authenticateToken],
            },
            {
                httpVerb: 'post',
                controllerMethod: 'create',
                suffix: '',
                middlewares: [],
            },
            {
                httpVerb: 'put',
                controllerMethod: 'update',
                suffix: '/:id',
                middlewares: [authenticateToken, verifyAdmin_Role],
            },
            {
                httpVerb: 'delete',
                controllerMethod: 'destroy',
                suffix: '/:id',
                middlewares: [authenticateToken, verifyAdmin_Role],
            },
        ]
    }

    resource(modelName, controllerClass) {
        for (const route of this.routeDefinitions) {
            const routeUrl = `/${modelName}${route.suffix}`;
            this.route(route.httpVerb, routeUrl, [...route.middlewares], controllerClass, route.controllerMethod);
        }
    }

    route(httpVerb, url, middlewares, controllerClass, methodName) {
        this.app[httpVerb](url, middlewares, (req, res) => {
            const controller = new controllerClass(req, res);
            const method = controller[methodName];
            if (!method) {
                throw new Error(`Invalid method ${methodName} in ${controller.constructor.name}`);
            } 
            method.bind(controller)();
        });
    }

    get(url, controllerClass, methodName, middlewares) {
        this.route('get', url, middlewares, controllerClass, methodName);
    }
}

// =================================================

module.exports = {
    RouteRegisterer,
}