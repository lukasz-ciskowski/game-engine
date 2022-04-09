import { Game } from '../../core/Game';

export interface IController {
    update(timestamp: number): void;
    load(): Promise<void> | void;
}

export abstract class BaseController implements IController {
    public get game() {
        return Game.instance;
    }

    load() {
        return;
    }

    update(timestamp: number): void {
        return;
    }
}
