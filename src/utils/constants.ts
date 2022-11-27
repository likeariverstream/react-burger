import { getCookie } from "./coockie";
const token = getCookie('access');
export const baseUrl: string = 'https://norma.nomoreparties.space/api';
export const wsUrl: string = 'wss://norma.nomoreparties.space/orders/all';
export const userOrdersUrl: string = `wss://norma.nomoreparties.space/orders?token=${token}`;
