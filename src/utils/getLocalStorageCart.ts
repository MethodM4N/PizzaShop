import { ICartSlice, TItems } from "../Redux/Slices/cartSlice";
import { calcCartFullPrice, calcCartFullCount } from "./calcCartValues";

export const getLocalStorageCart = (): ICartSlice => {
  const data = localStorage.getItem('cart');
  const items: TItems[] = data ? JSON.parse(data) : [];
  const fullPrice = calcCartFullPrice(items);
  const fullCount = calcCartFullCount(items);

    return {
      items,
      fullPrice, 
      fullCount
    }
}