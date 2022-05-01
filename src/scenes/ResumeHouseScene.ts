import { GameMap } from 'controllers/map/GameMap';
import { MapImage } from 'controllers/map/MapImage';
import { Tileset } from 'controllers/map/Tileset';
import { Scene } from 'controllers/Scene';
import { SpriteObject } from 'controllers/sprite/SpriteObject';
import { HelperQuestionmark } from 'objects/HelperQuestionmark';
import { Portal } from 'objects/interactives/Portal';
import { Player } from 'objects/Player';

export class ResumeHouseScene extends Scene {
    constructor() {
        super('ResumeHouse');
    }

    public async load() {
        const map = await this.loadTileMapJSON('resume-house');
        await map.addTileset('indoor', 'indoor-tileset', 1.5);
        const questionMark = await this.addImage("question", { x: 354, y: 125, scale: 0.5 });

        map.createLayers(['floor'], 'indoor');
        const collisions = map.createLayers(['furniture', 'walls'], 'indoor');
        const doors = map.createLayers(['door'], 'indoor');
        const shelfes = map.createLayers(['shelfes'], 'indoor');

        const player = new Player()
        await this.queue.addController(player);        

        this.collisions.addCollisions([[...collisions, ...doors, ...shelfes], [player.sprite]]);
        await this.queue.addController(new Portal(doors, 'Main'));
        // await this.queue.addController(new HelperQuestionmark(questionMark, shelfes));

        this.game.camera.setPosition(248, 220);
        this.game.camera.setBounds([
            [150, 100],
            [600, 550],
        ]);
    }
}
