import { GameMap } from 'controllers/map/GameMap';
import { MapImage } from 'controllers/map/MapImage';
import { Tileset } from 'controllers/map/Tileset';
import { Scene } from 'controllers/Scene';
import { HelperQuestionmark } from 'objects/HelperQuestionmark';
import { HouseEntry } from 'objects/HouseEntry';
import { Player } from 'objects/Player';
import { GameCache } from './cache/GameCache';

export class ResumeHouseScene extends Scene {
    private _map: GameMap;
    private _player: Player;
    private _mainTileset: Tileset;
    private _questionMark: MapImage;

    constructor() {
        super('ResumeHouse');
    }

    public async preload() {
        this._map = await this.loadTileMapJSON('/assets/tilemaps/resume-house.json');
        this._mainTileset = await this._map.addTileset('indoor', '/assets/tilemaps/tiles/indoor.png', 1.5);
        this._questionMark = await this.addImage('/assets/img/question.png', { x: 354, y: 125, scale: 0.5 });
    }

    public async load() {
        this._player = GameCache.player;
        this._map.createLayers(['floor'], 'indoor');
        const collisions = this._map.createLayers(['furniture', 'walls'], 'indoor');
        const doors = this._map.createLayers(['door'], 'indoor');

        this.queue.addController(this._player.sprite);

        this.game.camera.setPosition(248, 220);
        this.game.camera.setBounds([
            [150, 100],
            [600, 550],
        ]);
        this._player.sprite.toMiddle();

        this.collisions.addCollisions([[...collisions, ...doors], [this._player.sprite]]);
        this.queue.addController(new HouseEntry(doors, 'Main'));
        this.queue.addController(this._questionMark);
        this.queue.addController(this._player);
        this.queue.addController(new HelperQuestionmark(this._questionMark));
    }
}
