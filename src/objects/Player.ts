import { BaseController } from 'controllers/base/BaseController';
import { SpriteObject } from 'controllers/sprite/SpriteObject';

const SPEED = 1;

export class Player extends BaseController {
    constructor(private readonly _sprite: SpriteObject) {
        super();
        this._sprite.animator.add('idle-down', { frames: ['down-1.png'] });
        this._sprite.animator.add('idle-up', { frames: ['up-1.png'] });
        this._sprite.animator.add('idle-left', { frames: ['left-1.png'] });
        this._sprite.animator.add('idle-right', { frames: ['right-2.png'] });

        this._sprite.animator.add('move-down', {
            frames: ['down-2.png', 'down-3.png', 'down-4.png', 'down-1.png'],
            speed: 20,
        });
        this._sprite.animator.add('move-up', {
            frames: ['up-2.png', 'up-3.png', 'up-4.png', 'up-1.png'],
            speed: 20,
        });
        this._sprite.animator.add('move-left', {
            frames: ['left-2.png', 'left-3.png', 'left-4.png', 'left-1.png'],
            speed: 20,
        });
        this._sprite.animator.add('move-right', {
            frames: ['right-2.png', 'right-3.png', 'right-4.png', 'right-1.png'],
            speed: 20,
        });

        this._sprite.playAnimation('idle-down');
    }

    update(timestamp: number): void {
        this._sprite.update(timestamp);

        if (this.game.cursor.keyboard.w.isPressed) {
            this.sprite.playAnimation('move-up');
            this.game.camera.move({ y: -SPEED });
        } else if (this.game.cursor.keyboard.s.isPressed) {
            this.sprite.playAnimation('move-down');
            this.game.camera.move({ y: SPEED });
        } else if (this.game.cursor.keyboard.a.isPressed) {
            this.sprite.playAnimation('move-left');
            this.game.camera.move({ x: -SPEED });
        } else if (this.game.cursor.keyboard.d.isPressed) {
            this.sprite.playAnimation('move-right');
            this.game.camera.move({ x: SPEED });
        } else {
            const lastFrame = this.sprite.animator.current?.frame.split('-')?.[0];

            this.sprite.playAnimation(`idle-${lastFrame || 'down'}`);
        }
    }

    public get sprite() {
        return this._sprite;
    }
}
