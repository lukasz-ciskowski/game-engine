import { GameObject } from 'controllers/base/GameObject';

type CollisionsTuple = [GameObject[], GameObject[]]

export class Collisions {
    private readonly collisions: CollisionsTuple[] = [];

    constructor() {}

    public addCollisions(tuple: CollisionsTuple) {
        this.collisions.push(tuple);
    }

    public isColliding(newX: number, newY: number, collideObj: GameObject) {
        let anyColliding = false;
        this.collisions.forEach(([source, target]) => {            
            const verifyWith = target.find((c) => c === collideObj);
            if (!verifyWith) return

            verifyWith.setColliding(false)
            source.forEach((s) => {
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
}
