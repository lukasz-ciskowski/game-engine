import { BaseController } from 'controllers/base/BaseController';
import { Animator } from 'controllers/core/Animator';
import { MapImage } from 'controllers/map/MapImage';

export class HelperQuestionmark extends BaseController {
    private readonly _animator: Animator = new Animator();

    constructor(private readonly _questionImg: MapImage) {
        super();

        const liftUp = Array.from({ length: 5 }).map(() => () => this._questionImg.move(0, 0.8));
        const liftDown = Array.from({ length: 5 }).map(() => () => this._questionImg.move(0, -0.8));
        this._animator.add('lift', {
            fn: [
                ...liftUp,
                ...liftDown,
            ],
            delay: 15,
        });

        this._animator.setup('lift');
    }

    update(timestamp: number): void {
        this._animator.play(timestamp)?.fn();
    }
}
