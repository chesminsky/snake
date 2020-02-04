export interface GameField {
    direction: GameMoveDirection;
    items: Array<Array<GameObject>>;
}

export enum GameObject {
    Snake = 1,
    Egg = 2
}

export enum GameMoveDirection {
    Up,
    Left,
    Right,
    Down
}
