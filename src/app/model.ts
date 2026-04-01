export enum Priority {
  Low = 0,
  Normal = 1,
  Medium = 2,
  High = 3,
}

export interface IColumn {
  id: number;
  name: string;
}

export interface ICard {
  id: string;
  title: string;
  description: string;
  tag: ITag;
  priority: Priority;
  column: number;
  order: string;
}

export interface ITag {
  name: string;
  color: string;
}
