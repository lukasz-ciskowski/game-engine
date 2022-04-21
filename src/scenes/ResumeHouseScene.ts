import { GameMap } from 'controllers/map/GameMap';
import { MapImage } from 'controllers/map/MapImage';
import { Tileset } from 'controllers/map/Tileset';
import { Scene } from 'controllers/Scene';
import { HelperQuestionmark } from 'objects/HelperQuestionmark';
import { HouseEntry } from 'objects/HouseEntry';
import { Player } from 'objects/Player';

export class ResumeHouseScene extends Scene {
    private _map: GameMap;
    private _player: Player;
    private _mainTileset: Tileset;
    private _questionMark: MapImage;

    constructor() {
        super('ResumeHouse');
    }

    public async load() {
        this._map = await this.loadTileMapJSON('resume-house');
        this._mainTileset = await this._map.addTileset('indoor', 'indoor-tileset', 1.5);
        this._questionMark = await this.addImage("question", { x: 354, y: 125, scale: 0.5 });

        this._player = Player.instance;
        this._map.createLayers(['floor'], 'indoor');
        const collisions = this._map.createLayers(['furniture', 'walls'], 'indoor');
        const doors = this._map.createLayers(['door'], 'indoor');
        const shelfes = this._map.createLayers(['shelfes'], 'indoor');

        this.queue.addController(this._player.sprite);

        this.game.camera.setPosition(248, 220);
        this.game.camera.setBounds([
            [150, 100],
            [600, 550],
        ]);
        this._player.sprite.toMiddle();

        this.collisions.addCollisions([[...collisions, ...doors, ...shelfes], [this._player.sprite]]);
        this.queue.addController(new HouseEntry(doors, 'Main'));
        this.queue.addController(this._questionMark);
        this.queue.addController(this._player);
        this.queue.addController(new HelperQuestionmark(this._questionMark, shelfes));
    }
}
