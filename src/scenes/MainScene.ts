import { GameMap } from 'controllers/map/GameMap';
import { Tileset } from 'controllers/map/Tileset';
import { Scene } from 'controllers/Scene';
import { HouseEntry } from 'objects/HouseEntry';
import { Player } from 'objects/Player';

export class MainScene extends Scene {
    private _map: GameMap;
    private _player: Player;
    private _mainTileset: Tileset;

    constructor() {
        super('Main');
    }

    public async load() {
        this._map = await this.loadTileMapJSON('map');
        this._mainTileset = await this._map.addTileset('tileset', "map-tileset", 2);
        this._player = Player.instance;

        this._map.createLayers(
            ['water', 'terrain', 'path', 'extra-objects', 'terrain-up', 'terrain-grass', 'trees', 'fences', 'houses'],
            'tileset',
        );
        const resumeHouse = this._map.createLayers(['resume-house'], 'tileset');
        const collisions = this._map.createLayers(['collisions'], 'tileset');
        this.queue.addController(this._player.sprite);

        this.game.camera.setPosition(
            this._player.lastSavedScenePos?.x ?? 120,
            this._player.lastSavedScenePos?.y ?? 650,
        );
        this.game.camera.setBounds([
            [0, 0],
            [this._mainTileset.width, this._mainTileset.height],
        ]);

        this._player.sprite.toMiddle();

        // layers with higher zindex
        this._map.createLayers(['collide-layers'], 'tileset');

        this.collisions.addCollisions([[...collisions, ...resumeHouse], [this._player.sprite]]);
        this.queue.addController(new HouseEntry(resumeHouse, 'ResumeHouse'));
        this.queue.addController(this._player);
    }

    public unload(): void {
        super.unload();
        this._map.clearLayers();
    }
}
