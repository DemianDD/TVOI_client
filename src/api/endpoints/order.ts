import { post } from "../axios";
import { ORDER } from "../constants";

export function ProceedOrder(order: IOrder) {
    return post(`order`, order);
}