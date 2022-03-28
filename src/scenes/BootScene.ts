export class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload(): void {
        this.load.pack('preload', 'assets/pack.json', 'preload');

        this.load.on('complete', () => {
            console.log('completed');
        });
    }

    update(): void {
        this.scene.start('GameScene');
    }
}
