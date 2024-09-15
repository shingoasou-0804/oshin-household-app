export type TransactionType = 'income' | 'expense';
export type IncomeCategory = "給与" | "副収入" | "お小遣い";
export type ExpenseCategory = "食費" | "日用品" | "交通費" | "医療費" | "保険" | "水道光熱費" | "通信費" | "住宅" | "税金" | "教育" | "交際費" | "美容" | "趣味" | "特別費" | "その他";


export interface Transaction {
    id: string,
    date: string,
    amount: number,
    content: string,
    type: TransactionType,
    category: IncomeCategory | ExpenseCategory,
}

export interface Balance {
    income: number,
    expense: number,
    balance: number,
}

export interface CalendarContent {
    start: string,
    income: string,
    expense: string,
    balance: string,
}
