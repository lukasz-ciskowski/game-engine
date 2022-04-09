import { Scene } from 'controllers/Scene';
import { Player } from 'objects/Player';

export class MainScene extends Scene {
    constructor() {
        super('Main');
    }

    public async preload() {
        this.game.setScale(3);

        const map = await this.loadTileMapJSON('/assets/tilemaps/map.json');
        const mainSet = await map.addTileset('tileset', '/assets/tilemaps/tiles/tileset.png', 2);

        map.createLayers(
            ['water', 'terrain', 'path', 'extra-objects', 'terrain-up', 'terrain-grass', 'trees', 'fences', 'houses'],
            'tileset',
        );

        this.game.camera.setPosition(120, 40);
        this.game.camera.setBounds([
            [0, 0],
            [mainSet.width, mainSet.height],
        ]);

        const playerSprite = await this.addSprite('/assets/player/player.json');
        playerSprite.setScale(0.4).setFrame('down-2.png');
        const player = new Player(playerSprite);

        this.game.camera.follow(playerSprite);
        this.game.queue.addController(player);

        map.createLayers(['collide-layers'], 'tileset');
    }
}
