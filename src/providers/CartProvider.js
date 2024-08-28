import { createContext, useContext } from "react";


export const CartContext = createContext({

});

const CartProvider = ({children}) =>{
    return(
        <CartContext.Provider 
        value={{items: [1,2,3], onAddItem: () => {}}}
        >
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;

export const useCart = () => useContext(CartContext)