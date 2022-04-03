import { Scene } from 'controllers/Scene';

export class MainScene extends Scene {
    public z: number = 0

    constructor() {
        super('Main');
    }

    public async preload() {
        console.log('preload');
        this.game.ctx.scale(6, 6);
        
        const map = await this.loadTileMapJSON('/assets/tilemaps/map.json');
        await map.addTileset('tileset', '/assets/tilemaps/tiles/tileset.png');
        
        map.createLayer('water', 'tileset');
        map.createLayer('terrain', 'tileset');
         
        this.game.camera.setPosition(60, 30)
        const player = await this.addSprite('/assets/player/player.json');
    }

    public load() {
        console.log('load');
    }
    
    public update() {
        super.update()
        this.z += 0.1 
        
        this.game.camera.setPosition(60 + this.z, 30 + this.z)
    }
}
