interface TDraw {
    draw: () => void;
}

export class DrawQueue {
    private queue: TDraw[] = [];

    public push(t: TDraw) {
        this.queue.push(t);
    }

    public drawAll() {
        this.queue.forEach((q) => q.draw());
    }
}
