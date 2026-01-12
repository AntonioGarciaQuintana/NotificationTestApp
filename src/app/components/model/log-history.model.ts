export interface LogHistory {
    id: number;
    typeCode: string;
    typeDescription: string;
    categoryCode: string;
    categoryDescription: string;
    message: string;
    userId: number;
    userName: string;
    userEmail: string;
    userPhone: string;
    timestamp: Date;
    delivered: boolean
}