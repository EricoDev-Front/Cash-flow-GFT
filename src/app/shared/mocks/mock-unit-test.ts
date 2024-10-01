import { IAllCurrencies } from "../interfaces/currency.interface";
import { ITable } from "../interfaces/table.interface";

export const allQuotationsMock: IAllCurrencies = {
    USD: { code: 'USD', codein: 'BRL', name: 'Dollar', high: '5.00', low: '4.50', varBid: '0.10', pctChange: '2.00', bid: '4.80', ask: '4.90', timestamp: '1633024800', create_date: '2021-09-30' },
    CAD: { code: 'CAD ', codein: 'BRL', name: 'Dollar Canadense', high: '4.0544', low: '4.0167', varBid: '0.10', pctChange: '2.00', bid: '4.80', ask: '4.90', timestamp: '1633024800', create_date: '2021-09-30' },
};

export const quotationByCurrencyMock: IAllCurrencies = {
    USD: { code: 'USD', codein: 'BRL', name: 'Dollar', high: '5.00', low: '4.50', varBid: '0.10', pctChange: '2.00', bid: '4.80', ask: '4.90', timestamp: '1633024800', create_date: '2021-09-30' },
};

export const mockArray: ITable[] = Array.from({ length: 30 }, (_, index) => ({
    selected: Math.random() > 0.5,
    date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
    transactionType: ['Entrada', 'Saída'][Math.floor(Math.random() * 2)],
    amount: Math.floor(Math.random() * 1000) + 1,
    description: `Item ${index + 1}`,
    quotation: Math.floor(Math.random() * 100) + 1,
}));


export const mockITable: ITable[] = Array.from({ length: 30 }, (_, index) => (
    {selected: true, date: '2024-11-18', transactionType: 'Entrada', amount: 310, description: 'Item 27', quotation: 52.10084033613445}
));