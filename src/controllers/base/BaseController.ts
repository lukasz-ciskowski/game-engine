import { Game } from '../../core/Game';

export interface IController {
    update(timestamp: number): void;
    load(): Promise<void> | void;
}

export abstract class BaseController implements IController {
    private readonly controllers: BaseController[] = [];

    public get game() {
        return Game.instance;
    }

    load() {
        return;
    }

    update(timestamp: number): void {
        this.controllers.forEach((c) => c.update(timestamp));
        return;
    }

    async addController(controller: BaseController) {
        this.controllers.push(controller);
        await controller.load();
    }

    async addControllers(controllers: BaseController[]) {
        this.controllers.push(...controllers);
        await Promise.all(controllers.map((c) => c.load()));
    }
}
