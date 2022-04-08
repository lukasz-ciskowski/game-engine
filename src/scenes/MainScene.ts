import { Scene } from 'controllers/Scene';
import { Player } from 'objects/Player';

export class MainScene extends Scene {
    constructor() {
        super('Main');
    }

    public async preload() {
        this.game.setScale(3);

        const map = await this.loadTileMapJSON('/assets/tilemaps/map.json');
        await map.addTileset('tileset', '/assets/tilemaps/tiles/tileset.png');

        map.createLayers(
            ['water', 'terrain', 'path', 'extra-objects', 'terrain-up', 'terrain-grass', 'trees', 'fences', 'houses'],
            'tileset',
        );

        this.game.camera.setPosition(60, 30);

        const playerSprite = await this.addSprite('/assets/player/player.json');
        playerSprite.setScale(0.3).setFrame('down-2.png');
        const player = new Player(playerSprite);

        this.game.camera.follow(playerSprite)
        this.addController(player);
    }
}
