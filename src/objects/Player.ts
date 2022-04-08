import { BaseController } from 'controllers/base/BaseController';
import { Sprite } from 'controllers/sprite/Sprite';

const SPEED = 1

export class Player extends BaseController {
    constructor(private readonly sprite: Sprite) {
        super();
    }

    update(timestamp: number): void {
        if (this.game.cursor.keyboard.w.isPressed) {
            this.game.camera.move({ y: -SPEED })
        }
        if (this.game.cursor.keyboard.s.isPressed) {
            this.game.camera.move({ y: SPEED })
        }
        if (this.game.cursor.keyboard.a.isPressed) {
            this.game.camera.move({ x: -SPEED })
        }
        if (this.game.cursor.keyboard.d.isPressed) {
            this.game.camera.move({ x: SPEED })
        }
        // this.game.camera.move({ x: 0.3, y: 0.3})
        // this.sprite.move({ x: 0.1, y: 0.1 });
    }
}
