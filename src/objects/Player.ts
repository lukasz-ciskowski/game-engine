import { BaseController } from 'controllers/base/BaseController';
import { GameObject } from 'controllers/base/GameObject';
import { SpriteObject } from 'controllers/sprite/SpriteObject';

const SPEED = 120;
const WALKING_DELAY = 15;

export class Player extends BaseController {
    private static _instance: Player;
    private _sprite: SpriteObject;

    public static get instance() {
        return this._instance;
    }

    public static init() {
        this._instance = new Player();
    }

    async load() {
        const prevFrame = this._sprite ? this.sprite.animator.currentFrame?.name : null;

        this._sprite = await this.game.currentScene.addSprite('player');

        this._sprite.setScale(0.4).setCollisionBox({ x: 4.5, y: 18, width: 10, height: 8 });
        this._sprite.animator.addFrames('idle-down', { frames: ['down-1.png'] });
        this._sprite.animator.addFrames('idle-up', { frames: ['up-1.png'] });
        this._sprite.animator.addFrames('idle-left', { frames: ['left-1.png'] });
        this._sprite.animator.addFrames('idle-right', { frames: ['right-2.png'] });

        this._sprite.animator.addFrames('move-down', {
            frames: ['down-2.png', 'down-3.png', 'down-4.png', 'down-1.png'],
            delay: WALKING_DELAY,
        });
        this._sprite.animator.addFrames('move-up', {
            frames: ['up-2.png', 'up-3.png', 'up-4.png', 'up-1.png'],
            delay: WALKING_DELAY,
        });
        this._sprite.animator.addFrames('move-left', {
            frames: ['left-2.png', 'left-3.png', 'left-4.png', 'left-1.png'],
            delay: WALKING_DELAY,
        });
        this._sprite.animator.addFrames('move-right', {
            frames: ['right-2.png', 'right-3.png', 'right-4.png', 'right-1.png'],
            delay: WALKING_DELAY,
        });

        this._sprite.playAnimation(prevFrame ?? 'idle-down');
        this.game.camera.follow(this._sprite);
    }

    constructor() {
        super();
    }

    update(timestamp: number): void {
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

    public interactsWith(withObjects: GameObject[]) {
        return withObjects.some((o) => o.isColliding === this.sprite);
    }

    /**
     * Play idle/moving animation regarding if user is colliding
     */
    private playWalkingAnimation(direction?: string) {
        if (this.sprite.isColliding || !direction) {
            const lastFrame = this.sprite.animator.currentFrame?.frame.split('-')?.[0];
            this.sprite.playAnimation(`idle-${lastFrame || 'down'}`);
        } else {
            this.sprite.playAnimation(direction);
        }
    }

    public get sprite() {
        return this._sprite;
    }
}
