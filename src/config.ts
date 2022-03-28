import 'phaser';
import { BootScene } from 'scenes/BootScene';
import { GameScene } from 'scenes/GameScene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    title: 'Portfolio',
    render: { pixelArt: false, antialias: true },
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'game',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
    },
    scene: [BootScene, GameScene],
};
