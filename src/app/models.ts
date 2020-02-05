export interface GameField {
    nextDirection: GameMoveDirection;
    direction: GameMoveDirection;
    items: GameFieldItems;
    snake: Snake;
    valid: boolean;
}

export type GameFieldItems= Array<Array<GameObject>>;

export enum GameObject {
    Empty = 0,
    Snake = 1,
    Egg = 2
}

export enum GameMoveDirection {
    Up,
    Left,
    Right,
    Down
}

export type Snake = Array<{ x: number; y: number; }>;
