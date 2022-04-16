import { GameMap } from 'controllers/map/GameMap';
import { Tileset } from 'controllers/map/Tileset';
import { Scene } from 'controllers/Scene';
import { Player } from 'objects/Player';

export class MainScene extends Scene {
    private _map: GameMap;
    private _player: Player;
    private _mainTileset: Tileset;

    constructor() {
        super('Main');
    }

    public async preload() {
        this.game.setScale(3);

        this._map = await this.loadTileMapJSON('/assets/tilemaps/map.json');
        this._mainTileset = await this._map.addTileset('tileset', '/assets/tilemaps/tiles/tileset.png', 2);

        const playerSprite = await this.addSprite('/assets/player/player.json');
        playerSprite.setScale(0.4).setCollisionBox({ x: 3.5, y: 15, width: 12, height: 12 });
        this._player = new Player(playerSprite);
    }

    public async load() {
        this._map.createLayers(
            ['water', 'terrain', 'path', 'extra-objects', 'terrain-up', 'terrain-grass', 'trees', 'fences', 'houses'],
            'tileset',
        );

        this.game.camera.setPosition(120, 40);
        this.game.camera.setBounds([
            [0, 0],
            [this._mainTileset.width, this._mainTileset.height],
        ]);

        this._player.sprite.toMiddle();
        this.queue.addController(this._player);

        this.game.camera.follow(this._player.sprite);

        const collisions = this._map.createLayers(['collisions'], 'tileset');
        this._map.createLayers(['collide-layers'], 'tileset');

        if (collisions) this.collisions.addCollisions([collisions, [this._player.sprite]]);
    }
}
