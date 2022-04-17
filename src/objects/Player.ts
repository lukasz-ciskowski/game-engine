import { BaseController } from 'controllers/base/BaseController';
import { SpriteObject } from 'controllers/sprite/SpriteObject';

const SPEED = 120;
const WALKING_SPEED = 15;

export class Player extends BaseController {
    private static _instance: Player;
    public static get instance() {
        return this._instance;
    }

    constructor(private readonly _sprite: SpriteObject) {
        super();
        this._sprite.animator.add('idle-down', { frames: ['down-1.png'] });
        this._sprite.animator.add('idle-up', { frames: ['up-1.png'] });
        this._sprite.animator.add('idle-left', { frames: ['left-1.png'] });
        this._sprite.animator.add('idle-right', { frames: ['right-2.png'] });

        this._sprite.animator.add('move-down', {
            frames: ['down-2.png', 'down-3.png', 'down-4.png', 'down-1.png'],
            speed: WALKING_SPEED,
        });
        this._sprite.animator.add('move-up', {
            frames: ['up-2.png', 'up-3.png', 'up-4.png', 'up-1.png'],
            speed: WALKING_SPEED,
        });
        this._sprite.animator.add('move-left', {
            frames: ['left-2.png', 'left-3.png', 'left-4.png', 'left-1.png'],
            speed: WALKING_SPEED,
        });
        this._sprite.animator.add('move-right', {
            frames: ['right-2.png', 'right-3.png', 'right-4.png', 'right-1.png'],
            speed: WALKING_SPEED,
        });

        this._sprite.playAnimation('idle-down');
        Player._instance = this;
    }

    update(timestamp: number): void {
        this._sprite.update(timestamp);

        if (this.game.cursor.keyboard.w.isPressed) {
            this.playWalkingAnimation('move-up');
            this.game.camera.move({ y: -SPEED * timestamp });
        } else if (this.game.cursor.keyboard.s.isPressed) {
            this.playWalkingAnimation('move-down');
            this.game.camera.move({ y: SPEED * timestamp });
        } else if (this.game.cursor.keyboard.a.isPressed) {
            this.playWalkingAnimation('move-left');
            this.game.camera.move({ x: -SPEED * timestamp });
        } else if (this.game.cursor.keyboard.d.isPressed) {
            this.playWalkingAnimation('move-right');
            this.game.camera.move({ x: SPEED * timestamp });
        } else {
            this.playWalkingAnimation();
        }
    }

    private playWalkingAnimation(direction?: string) {
        if (this.sprite.isColliding || !direction) {
            const lastFrame = this.sprite.animator.current?.frame.split('-')?.[0];
            this.sprite.playAnimation(`idle-${lastFrame || 'down'}`);
        } else {
            this.sprite.playAnimation(direction);
        }
    }

    public get sprite() {
        return this._sprite;
    }
}
