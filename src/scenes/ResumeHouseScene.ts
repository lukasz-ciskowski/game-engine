import { GameMap } from 'controllers/map/GameMap';
import { Tileset } from 'controllers/map/Tileset';
import { Scene } from 'controllers/Scene';
import { Player } from 'objects/Player';
import { GameCache } from './cache/GameCache';

export class ResumeHouseScene extends Scene {
    private _map: GameMap;
    private _player: Player;
    private _mainTileset: Tileset;

    constructor() {
        super('ResumeHouse');
    }

    public async preload() {
        this._map = await this.loadTileMapJSON('/assets/tilemaps/resume-house.json');
        this._mainTileset = await this._map.addTileset('indoor', '/assets/tilemaps/tiles/indoor.png', 1.5);
    }

    public async load() {
        this._player = GameCache.player;
        this._map.createLayers(['floor'], 'indoor');
        const collisions = this._map.createLayers(['furniture', 'walls'], 'indoor');
        this.game.camera.setPosition(248, 230);
        this.game.camera.setBounds([
            [150, 100],
            [600, 550],
        ]);

        // this.game.camera.setPosition(0, 0);
        this.queue.addController(this._player);

        this.collisions.addCollisions([collisions, [this._player.sprite]]);

        this._player.sprite.toMiddle();
    }
}
