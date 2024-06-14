const initialState = {
  items: [], // Danh sách sản phẩm trong giỏ hàng
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ONE_TO_CART':
      return addOneToCartReducer(state, action.payload);
      case 'ADD_TO_CART':
        return addToCartReducer(state, action.payload);
      
    case 'REMOVE_FROM_CART':
      return removeFromCartReducer(state, action.payload);

    case 'DELETE_FROM_CART':
      return deleteFromCartReducer(state, action.payload);

    default:
      return state;
  }
};

const addToCartReducer = (state, product) => {
  const existingItemIndex = state.items.findIndex(
    (item) => item.eventId === product.eventId && item.type_name === product.type_name
  );

  if (existingItemIndex !== -1) {
    const updatedItems = state.items.map((item, index) => {
      if (index === existingItemIndex) {
        return {
          ...item,
          quantity: item.quantity + product.quantity, // Update quantity
        };
      }
      return item;
    });

    return {
      ...state,
      items: updatedItems,
    };
  } else {
    return {
      ...state,
      items: [...state.items, product],
    };
  }
};

const addOneToCartReducer = (state, product) => {
  const existingItemIndex = state.items.findIndex(item => item.id === product.id);
  
  if (existingItemIndex !== -1) {
    const updatedItems = state.items.map((item, index) => {
      if (index === existingItemIndex) {
        return {
          ...item,
          quantity: item.quantity + 1
        };
      }
      return item;
    });
    
    return {
      ...state,
      items: updatedItems
    };
  } else {
    return {
      ...state,
      items: [...state.items, { ...product, quantity: 1 }]
    };
  }
};

const removeFromCartReducer = (state, productId) => {
  const updatedItems = state.items.map(item => {
    if (item.id === productId && item.quantity > 1) {
      return {
        ...item,
        quantity: item.quantity - 1
      };
    }
    return item;
  });

  return {
    ...state,
    items: updatedItems.filter(item => item.quantity > 0)
  };
};

const deleteFromCartReducer = (state, productId) => {
  return {
    ...state,
    items: state.items.filter(item => item.id !== productId)
  };
};

export default cartReducer;
