import { BaseController } from 'controllers/base/BaseController';
import { SpriteObject } from 'controllers/sprite/SpriteObject';

const SPEED = 120;
const WALKING_DELAY = 15;

export class Player extends BaseController {
    private static _instance: Player;
    private static _lastSavedPosInScene: Map<string, { x: number; y: number }> = new Map();
    private _canMove: boolean = true

    public static get instance() {
        return this._instance;
    }

    constructor(private readonly _sprite: SpriteObject) {
        super();
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

        this._sprite.playAnimation('idle-down');
        Player._instance = this;
    }

    update(timestamp: number): void {
        if (!this._canMove) {
            this.playWalkingAnimation()
            return
        }

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
            const lastFrame = this.sprite.animator.currentFrame?.frame.split('-')?.[0];
            this.sprite.playAnimation(`idle-${lastFrame || 'down'}`);
        } else {
            this.sprite.playAnimation(direction);
        }
    }

    public get sprite() {
        return this._sprite;
    }

    public get lastSavedScenePos() {
        return Player._lastSavedPosInScene.get(this.game.currentScene?.name ?? '');
    }

    public setLastScenePos(x: number, y: number) {
        const currScene = this.game.currentScene?.name;
        if (!currScene) return;

        // since camera is taking the position without origin [0,0] but player object is centered
        const cameraRelatedPosX = x - this.game.canvas.width / this.game.scale / 2 + this._sprite.pos.width / 2;
        const cameraRelatedPosY = y - this.game.canvas.height / this.game.scale / 2 + this._sprite.pos.height / 2;

        Player._lastSavedPosInScene.set(currScene, { x: cameraRelatedPosX, y: cameraRelatedPosY });
    }

    public setIsMoving(movingFlag: boolean) {
        this._canMove = movingFlag
    }
}
