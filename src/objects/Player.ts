import { BaseController } from 'controllers/base/BaseController';
import { Sprite } from 'controllers/sprite/Sprite';

const SPEED = 1;

export class Player extends BaseController {
    constructor(private readonly _sprite: Sprite) {
        super();
        this._sprite.animator.add('idle', { frames: ['down-1.png'] });
        this._sprite.animator.add('move-down', {
            frames: ['down-1.png', 'down-2.png', 'down-3.png', 'down-4.png'],
            speed: 50,
        });
        this._sprite.playAnimation('idle');
    }

    update(timestamp: number): void {
        this._sprite.update(timestamp);

        if (this.game.cursor.keyboard.w.isPressed) {
            this.game.camera.move({ y: -SPEED });
        }
        else if (this.game.cursor.keyboard.s.isPressed) {
            this.sprite.playAnimation('move-down');
            this.game.camera.move({ y: SPEED });
        }
        else if (this.game.cursor.keyboard.a.isPressed) {
            this.game.camera.move({ x: -SPEED });
        }
        else if (this.game.cursor.keyboard.d.isPressed) {
            this.game.camera.move({ x: SPEED });
        } else {
            this.sprite.playAnimation("idle")
        }
    }

    public get sprite() {
        return this._sprite;
    }
}
