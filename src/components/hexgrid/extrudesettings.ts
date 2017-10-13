export class ExtrudeSettings {
    amount: number;
    bevelEnabled: boolean;
    bevelSegments: number;
    steps: number;
    bevelSize: number;
    bevelThickness: number;
    constructor() {
        this.amount = 1;
        this.bevelEnabled = true;
        this.bevelSegments = 1;
        this.steps = 1;
        this.bevelSize = 0.5;
        this.bevelThickness = 0.5;
    }

}