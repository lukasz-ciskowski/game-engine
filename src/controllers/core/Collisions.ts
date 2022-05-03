import { CollisionBox, GameObject } from 'controllers/base/GameObject';

export class Collisions {
    private _obstacles: GameObject[] = [];

    public addCollisions(obstacles: GameObject[]) {
        this._obstacles.push(...obstacles);
    }

    /**
     * Verify given object with registered collisions
     */
    public isColliding(newX: number, newY: number, verifyObject: GameObject) {
        const verifyBox = verifyObject.getCollisionBox(newX, newY);

        // clear all collisions before checking
        this._obstacles.forEach((o) => o.setCollision(false));
        for (const obstacle of this._obstacles) {
            if (obstacle === verifyObject) {
                continue;
            }

            const colliderBox = obstacle.getCollisionBox();
            if (this.verifyCollisionBoxes(colliderBox, verifyBox)) {
                verifyObject.setCollision(obstacle);
                obstacle.setCollision(verifyObject);
                return true;
            }
        }

        return false;
    }

    /**
     * Verifies if two collision boxes overlaps
     */
    private verifyCollisionBoxes(source: CollisionBox, target: CollisionBox) {
        return (
            target.x + target.width >= source.x &&
            target.x <= source.x + source.width &&
            target.y <= source.y + source.height &&
            target.y + target.height >= source.y
        );
    }
}
