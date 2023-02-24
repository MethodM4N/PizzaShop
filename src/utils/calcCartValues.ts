import { TItems } from "../Redux/Slices/cartSlice";

export const calcCartFullPrice = (items: TItems[]) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
}

export const calcCartFullCount = (items: TItems[]) => {
  return items.reduce((sum, obj) => sum + obj.count, 0);
}