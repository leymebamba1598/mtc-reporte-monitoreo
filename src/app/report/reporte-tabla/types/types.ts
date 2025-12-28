export interface IMonthData {
    cantidad: number;
    valor: number;
}

export interface IOrder {
    id: string;
    enero?: IMonthData;
    febrero?: IMonthData;
    abril?: IMonthData;
    mayo?: IMonthData;
    junio?: IMonthData;
    julio?: IMonthData;
    agosto?: IMonthData;
    septiembre?: IMonthData;
    octubre?: IMonthData;
    noviembre?: IMonthData;
    diciembre?: IMonthData;
    marzo?: IMonthData;
}

export interface IReportItem {
    id: number;
    name: string;
    enero?: IMonthData;
    febrero?: IMonthData;
    marzo?: IMonthData;
    abril?: IMonthData;
    mayo?: IMonthData;
    junio?: IMonthData;
    julio?: IMonthData;
    agosto?: IMonthData;
    septiembre?: IMonthData;
    octubre?: IMonthData;
    noviembre?: IMonthData;
    diciembre?: IMonthData;
    orders: IOrder[];
}