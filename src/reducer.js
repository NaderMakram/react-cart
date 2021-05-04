const reducer = (state, action) => {
  const clearCart = () => {
    return { ...state, cart: [] };
  };

  const removeItem = () => {
    let filteredCart = state.cart.filter((item) => item.id !== action.payload);
    return { ...state, cart: filteredCart };
  };

  const increase = () => {
    let newCart = state.cart.map((item) => {
      if (item.id === action.payload) {
        return { ...item, amount: item.amount + 1 };
      }
      return item;
    });
    return { ...state, cart: newCart };
  };

  const decrease = () => {
    // if there is only one item, remove it
    let itemToDecrease = state.cart.find((item) => item.id === action.payload);
    if (itemToDecrease.amount <= 1) {
      return removeItem(action.payload);
    }

    let newCart = state.cart.map((item) => {
      if (item.id === action.payload) {
        return { ...item, amount: item.amount - 1 };
      }
      return item;
    });
    return { ...state, cart: newCart };
  };

  const getTotals = () => {
    let { total, amount } = state.cart.reduce(
      (returnObject, cartItem) => {
        const { price, amount } = cartItem;
        returnObject.amount += amount;
        let totalPrice = amount * price;
        returnObject.total += totalPrice;

        return returnObject;
      },
      {
        total: 0,
        amount: 0,
      }
    );

    total = parseFloat(total.toFixed(2));

    return { ...state, total, amount };
  };

  switch (action.type) {
    case "CLEAR_CART":
      return clearCart();

    case "REMOVE_ITEM":
      return removeItem();

    case "INCREASE":
      return increase();

    case "DECREASE":
      return decrease();

    case "GET_TOTALS":
      return getTotals();

    case "LOADING":
      return { ...state, loading: true };

    case "DISPLAY_ITEMS":
      // console.log(payload);
      return { ...state, cart: action.payload, loading: false };

    default:
      return state;
  }
};

export default reducer;
