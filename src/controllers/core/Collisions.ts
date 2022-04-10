import { GameObject } from 'controllers/base/GameObject';

export class Collisions {
    private readonly collisions: [GameObject[], GameObject[]][] = [];

    constructor() {}

    public addCollisions(object1: GameObject[], object2: GameObject[]) {
        this.collisions.push([object1, object2]);
    }

    public isColliding(newX: number, newY: number, collideObj: GameObject) {
        let anyColliding = false;
        this.collisions.forEach(([source, target]) => {
            const verifyWith = target.find((c) => c === collideObj);
            if (!verifyWith) return
            

            verifyWith.setColliding(false)
            source.forEach((s) => {
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
