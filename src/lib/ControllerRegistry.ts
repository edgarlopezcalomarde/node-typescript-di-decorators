import { Router } from "express";


type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';


interface Route {
    method: HttpMethod;
    path: string;
    handler: string;
}

interface ControllerEntry {
    controller: any;
    instance: any;
}




const controllers: ControllerEntry[] = []

export function registerController(controller: any) {
    const instance = new controller();
    controllers.push({ controller, instance });
}

export function registerControllers(controllers: any[]) {
    [controllers].forEach(controller => {
        registerController(controller[0]);
    })
}

export function initializeControllers(appRouter: Router) {
    controllers.forEach(({ controller, instance }) => {
        const basePath: string = Reflect.getMetadata('basePath', controller);
        const routes: Route[] = Reflect.getMetadata('routes', controller) || [];

        routes.forEach(route => {
            const handler = instance[route.handler].bind(instance);
            appRouter[route.method](basePath + route.path, handler);
        });
    });
}


