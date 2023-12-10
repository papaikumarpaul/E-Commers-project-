import React, { createContext, useState } from "react";
import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext(null);

const ShopContextprovider = (props) => {
  const getDefaultCart = () => {
    let cart = {};
    for (let i = 0; i < all_product.length + 1; i++) {
      cart[i] = 0;
    }
    return cart;
  };
  const [cartItem, setCartItem] = useState(getDefaultCart());

  const addTocart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  let removeCart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };
  // err
  const getTotalcartItemAmount = () => {
    let total = 1;
    for (let item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInco = all_product.find((produ) => {
          return produ.id === Number(item);
        });

        total += itemInco.new_price * cartItem[item];

        console.log(itemInco);
      }

      return total;
    }
  };
  // 
  const contextValue = {
    getTotalcartItemAmount,
    all_product,
    cartItem,
    addTocart,
    removeCart,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextprovider;
