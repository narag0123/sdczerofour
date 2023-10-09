export type TData = {
    id?: number;
    writer: string;
    dispatch: string;
    region: string;
    place: string;
    placeDetail: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    company: string;
    commander: string;
    workers: string;
    equipment: string;
    content: string;
    hits: string;
    constFile?: File[];
};

export type ConstTable = {
    id?: number;
    writer: string;
    dispatch: string;
    region: string;
    place: string;
    placeDetail: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    company: string;
    commander: string;
    workers: string;
    equipment: string;
    content: string;
    hits: string;
    fileAttached: number;
    constCreatedTime: string;
    constUpdatedTime: string;
};
export type ConstFileTable = ConstTable & {
    constFile?: File[];
    originalFileName?: string;
    storedFileName?: string[];
    // constId: number;
};
