export { default as Header } from './Header'
export { default as Sort } from './Sort'
export { default as Categories } from './Categories'
export { default as NotFoundBlock } from './NotFoundBlock/NotFoundBlock'
export { default as PizzaBlock } from './PizzaBlock/PizzaBlock'
export { default as Skeleton } from './PizzaBlock/Skeleton'
// barrel export works same (without export default inside the component)
export * from './CartBlock/CartBlock'

/* 
Same, but at the top it is reexport
and this one is the bad experience

import PizzaBlock from './PizzaBlock/PizzaBlock'
import Sort from './Sort'
export { PizzaBlock, Sort }; 
*/