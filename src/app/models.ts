export interface GameField {
    direction: GameMoveDirection;
    items: GameFieldItems;
    snake: Snake;
}

export type GameFieldItems= Array<Array<GameObject>>;

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

export type Snake = Array<{ x: number; y: number; }>;
