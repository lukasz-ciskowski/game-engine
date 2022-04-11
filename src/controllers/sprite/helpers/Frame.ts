interface FrameProps {
    x: number;
    y: number;
    w: number;
    h: number;
}

export class Frame {
    constructor(public readonly props: FrameProps) {}
}
