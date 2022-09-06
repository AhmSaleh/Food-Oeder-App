import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  let newItems;
  let newTotalAmount;
  if (action.type == "ADD") {
    const currentItem = state.items.find((item) => item.id == action.item.id);

    if (!currentItem) {
      newItems = state.items.concat(action.item);
      newTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
    } else {
      newItems = state.items.map((i) => {
        if (i.id === currentItem.id) {
          return { ...i, amount: action.item.amount };
        }
        return i;
      });
      newTotalAmount =
        state.totalAmount -
        currentItem.price * currentItem.amount +
        action.item.price * action.item.amount;
    }

    return { items: newItems, totalAmount: newTotalAmount };
  } else if (action.type == "REMOVE") {
    const currentItemIndex = state.items.findIndex(
      (item) => item.id == action.id
    );

    if (state.items[currentItemIndex].amount == 1) {
      newItems = state.items.filter((item) => item.id !== action.id);
    } else {
      newItems = [...state.items];
      newItems[currentItemIndex].amount =
        state.items[currentItemIndex].amount - 1;
    }

    newTotalAmount = state.totalAmount - state.items[currentItemIndex].price;
    return { items: newItems, totalAmount: newTotalAmount };
  }

  return defaultCartState;
};

export default function CartProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}
