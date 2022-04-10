import { GameObject } from 'controllers/base/GameObject';
import { Sprite } from 'controllers/sprite/Sprite';

type CollisionsTuple = [(GameObject | Sprite)[], (GameObject | Sprite)[]]

export class Collisions {
    private readonly collisions: CollisionsTuple[] = [];

    constructor() {}

    public addCollisions(tuple: CollisionsTuple) {
        this.collisions.push(tuple);
    }

    public isColliding(newX: number, newY: number, collideObj: GameObject) {
        let anyColliding = false;
        this.collisions.forEach(([source, target]) => {            
            const verifyWith = target.map(this.getCollidingObject).find((c) => c === collideObj);
            if (!verifyWith) return
            console.log(verifyWith);
            
            

            verifyWith.setColliding(false)
            source.map(this.getCollidingObject).forEach((s) => {
                if (!s) return

                const vCollision = verifyWith.getCollisionPos(newX, newY)
                const sCollision = s.getCollisionPos(s.pos.x, s.pos.y)

                if (
                    vCollision.x + vCollision.width >= sCollision.x &&
                    vCollision.x <= sCollision.x + sCollision.width &&
                    vCollision.y <= sCollision.y + sCollision.height &&
                    vCollision.y + vCollision.height >= sCollision.y
                ) { 
                    anyColliding = true;
                    verifyWith.setColliding(s);
                    s.setColliding(verifyWith);
                }
            });            
        });

        return anyColliding;
    }

    private getCollidingObject(obj: GameObject | Sprite | undefined): GameObject | undefined {
        if (obj instanceof Sprite && obj) return obj.currentFrame
        return obj
    }
}
