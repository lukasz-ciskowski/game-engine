import { DrawQueue } from 'core/DrawQueue';
import { Game } from '../core/Game';

export abstract class BaseController {
    public readonly drawQueue = new DrawQueue();

    public get game() {
        return Game.instance;
    }
}
