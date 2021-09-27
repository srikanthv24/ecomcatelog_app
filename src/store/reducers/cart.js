import { types } from "../constants";

const initialState = {
  cartDetails: {
    items: [{ items: [] }],
  },
  cartItemList: [],
  cartLoading: false,
  cartItemsLoading: false,
};

export const Cart = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CART_ITEM:
      return { ...state, cartLoading: true };
    case types.GET_CART_ITEM_SUCCESS:
      return {
        ...state,
        cartItemList: action.payload.listCartItems.items,
        cartItemsLoading: false,
        cartLoading: false,
      };

    case types.GET_CART_ITEM_FAILURE:
      return { ...state, cartItemList: [], cartItemsLoading: false };

    // case types.UPDATE_CART_ITEM_SUCCESS:
    //   return { ...state, cartItemList: action.payload };

    case types.ADD_CART_ITEM_SUCCESS:
      return {
        ...state,
        cartItemsLoading: false,
      };

    case types.UPDATE_CART_ITEM:
      return { ...state, cartItemsLoading: true };

    case types.UPDATE_CART_ITEM_SUCCESS:
      return { ...state, cartItemsLoading: false };
    case types.UPDATE_CART_ITEM_FAILURE:
      return { ...state, cartItemsLoading: false };

    case types.GET_CART_SUCCESS:
      return {
        ...state,
        cartLoading: false,
        cartDetails: action.payload,
      };
    case types.GET_CART_FAILURE:
      return { ...state, cartLoading: false, cartDetails: {} };

    case types.CREATE_CART_SUCCESS:
      return {
        ...state,
        cartDetails: { ...action.payload.createCart },
      };
    case types.CREATE_CART_FAILURE:
      return { ...state, cartDetails: {} };

    case types.UPDATE_CART_SUCCESS:
      return {
        ...state,
        cartDetails: { ...action.payload.updateCart },
      };
    case types.UPDATE_CART_FAILURE:
      return { ...state, cartDetails: {} };

    default:
      return state;
  }
};
