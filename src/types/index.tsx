export enum ComponentType  {
    Question = 'question',
    Answer = 'answer'
}

export type GenericNodeData = {
    value ?: string;
    type ? : ComponentType;
}