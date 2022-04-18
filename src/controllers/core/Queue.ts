import { BaseController } from 'controllers/base/BaseController';

export class Queue {
    private _controllers: BaseController[] = [];

    async addController(controller: BaseController) {
        const controllerToAdd = this.verifyController(controller)
        if (!controllerToAdd) return

        this._controllers.push(controller);
        await controller.load();
    }

    async addControllers(controllers: BaseController[]) {
        const controllersToAdd = this.verifyControllers(controllers).filter(Boolean) as BaseController[]
        this._controllers.push(...controllersToAdd);
        await Promise.all(controllersToAdd.map((c) => c.load()));
    }

    async removeController(controller: BaseController) {
        this._controllers = this._controllers.filter((c) => c !== controller);
    }

    public get controllers() {
        return this._controllers;
    }

    public clear() {
        this._controllers = [];
    }

    private verifyControllers(controllers: BaseController[]) {
        return controllers.map(this.verifyController)
    }

    private verifyController(controller: BaseController) {
        if (this.controllers.find((c) => c === controller)) return false;
        return controller;
    }
}
