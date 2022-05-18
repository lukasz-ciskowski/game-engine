import { Scene } from 'controllers/Scene';
import { Portal } from 'objects/interactives/Portal';
import { Player } from 'objects/Player';

export class MainScene extends Scene {
    constructor() {
        super('Main');
    }

    public async load() {
        super.load();

        const map = await this.loadTileMapJSON('map');
        const mainTileset = await map.addTileset('tileset', 'map-tileset', 2);
        map.createLayers(
            ['water', 'terrain', 'path', 'extra-objects', 'terrain-up', 'terrain-grass', 'trees', 'fences', 'houses'],
            'tileset',
        );
        const resumeHouse = map.createLayers(['resume-house'], 'tileset', { isObstacle: true });
        map.createLayers(['collisions'], 'tileset', { isObstacle: true });

        await this.addController(Player.instance);

        // layers with higher zindex
        map.createLayers(['collide-layers'], 'tileset');

        await this.addController(new Portal(resumeHouse, 'ResumeHouse'));

        this.game.camera.setPosition({ x: 300, y: 750 });
        this.game.camera.setBounds([
            [0, 0],
            [mainTileset.width, mainTileset.height],
        ]);
    }
}
