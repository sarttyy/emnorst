
export class DeepState {
    constructor(props) {
        this.existing = new WeakSet();
        this.path = [];
        this.exit = 0;
        this.props = props;
        this.reset();
        this.target = null;
    }
    reset() {
        this.skip = false;
    }
    current() {
        const state = this;
        // /** @type {import("./prop").State} */
        // { parent, depth, innermost }
        return {
            parent: this.target,
            depth: this.depth(),
            deepest: this.isDeepest(),
            command(action) {
                switch(action) {
                case "exit":
                    state.exit++;
                    break;
                case "skip":
                    state.exit = -1;
                    break;
                }
            },
        };
    }
    depth() { return this.path.length; }
    isDeepest() { return this.depth() > this.props.depthLimit; }
    isExit() { return this.exit && this.exit--; }
    isDive() {
        return !this.isDeepest();
    }
}
