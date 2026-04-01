export enum Priority {
  Chill = 0,
  Emshy = 1,
  GettingNervous = 2,
  AssOnFire = 3,
}

export interface IColumn {
  id: number;
  title: string;
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
