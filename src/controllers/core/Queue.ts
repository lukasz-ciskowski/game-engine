import { BaseController } from 'controllers/base/BaseController';

export class Queue {
    private readonly _controllers: BaseController[] = [];

    async addController(controller: BaseController) {
        console.log(controller);
        
        this._controllers.push(controller);
        await controller.load();
    }

    async addControllers(controllers: BaseController[]) {
        this._controllers.push(...controllers);
        await Promise.all(controllers.map((c) => c.load()));
    }

    public get controllers() {
        return this._controllers;
    }
}
