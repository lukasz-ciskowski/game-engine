import { GameMap } from 'controllers/map/GameMap';
import { Tileset } from 'controllers/map/Tileset';
import { Scene } from 'controllers/Scene';
import { HouseEntry } from 'objects/HouseEntry';
import { Player } from 'objects/Player';

export class MainScene extends Scene {
    constructor() {
        super('Main');
    }

    public async load() {
        const map = await this.loadTileMapJSON('map');
        const mainTileset = await map.addTileset('tileset', 'map-tileset', 2);
        map.createLayers(
            ['water', 'terrain', 'path', 'extra-objects', 'terrain-up', 'terrain-grass', 'trees', 'fences', 'houses'],
            'tileset',
        );
        const resumeHouse = map.createLayers(['resume-house'], 'tileset');
        const collisions = map.createLayers(['collisions'], 'tileset');

        const playerSprite = await this.addSprite('player');
        const player = new Player(playerSprite);
        this.queue.addController(player);

        // layers with higher zindex
        map.createLayers(['collide-layers'], 'tileset');

        this.collisions.addCollisions([[...collisions, ...resumeHouse], [playerSprite]]);
        this.queue.addController(new HouseEntry(resumeHouse, 'ResumeHouse'));

        this.game.camera.setPosition(120, 650);
        this.game.camera.setBounds([
            [0, 0],
            [mainTileset.width, mainTileset.height],
        ]);
    }

    public unload(): void {
        super.unload();
        // map.clearLayers();
    }
}
