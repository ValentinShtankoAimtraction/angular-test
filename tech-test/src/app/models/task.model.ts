export interface ITask {
    id?: number;
    label?: string;
    description?: string;
    category?: string;
    done?: boolean | string;
}

export interface ITaskState {
    id: number;
    checked: boolean;
}

export enum ITaskTypes {
    ALL = "all",
    ACTIVE = "active",
    COMPLETED = "completed",
}

export type ITaskType = ITaskTypes.ALL | ITaskTypes.ACTIVE | ITaskTypes.COMPLETED;

export interface ITaskFilter{
    type: ITaskType;
    category: string;
}