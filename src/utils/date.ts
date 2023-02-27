const date = new Date();

export const getDaysInMonth = () => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
export const currentMonthName = date.toLocaleString('default', { month: 'long' });
export const currentDay = date.getDate();
