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

        const player = new Player();
        await this.addController(player);

        // layers with higher zindex
        map.createLayers(['collide-layers'], 'tileset');

        //await this.game.loadScene('ResumeHouse');
        await this.addController(new Portal(resumeHouse, 'ResumeHouse'));

        this.game.camera.setPosition(120, 650);
        this.game.camera.setBounds([
            [0, 0],
            [mainTileset.width, mainTileset.height],
        ]);
    }
}
