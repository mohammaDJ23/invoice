import { useReducer, useCallback, useEffect } from "react";
import { v4 as uuid } from "uuid";

import * as Invoice from "../../types";
import localForage from "localforage";

const initialState: Invoice.Invoice.UseProductManagementStateOption = {
  products: [],
  subTotal: 0,
  total: 0,
  tax: 0,
  showAddProductMenu: false
};

const getTotalPrice = (state: Invoice.Invoice.UseProductManagementStateOption) => {
  return state.products.reduce((accmulator, { price, quantity }) => {
    accmulator += price * quantity;

    return accmulator;
  }, 0);
};

const getAllPrices = (state: Invoice.Invoice.UseProductManagementStateOption) => {
  const subTotal = getTotalPrice(state);
  const tax = subTotal * 0.05;
  const total = subTotal + tax;

  return {
    subTotal,
    tax,
    total
  };
};

const dateCaching = (state: Invoice.Invoice.UseProductManagementStateOption) => {
  return localForage.setItem(
    Invoice.Invoice.IndexDBTermsOptions.PRODUCTS,
    JSON.stringify(state)
  );
};

const reducer = (
  state: Invoice.Invoice.UseProductManagementStateOption,
  action: Invoice.Invoice.UseProductManagementActionOptions
): Invoice.Invoice.UseProductManagementStateOption => {
  switch (action.type) {
    case Invoice.Invoice.UseProductManagementActionTypeOptions.UPDATE_PRODUCTS: {
      const product = action.product;
      const { title, description, price, quantity } = product;
      let newState = { ...state };

      const newProduct = {
        id: uuid(),
        title: title.value,
        description: description.value,
        price: +price.value,
        quantity: +quantity.value,
        total: +price.value * +quantity.value
      };

      newState.products.push(newProduct);

      const { subTotal, tax, total } = getAllPrices(newState);

      newState = {
        ...newState,
        subTotal,
        tax,
        total
      };

      dateCaching(newState);

      return newState;
    }

    case Invoice.Invoice.UseProductManagementActionTypeOptions.DELETE_PRODUCT: {
      const { id } = action;
      let newState = { ...state };

      newState.products = newState.products.filter(product => product.id !== id);

      const { subTotal, tax, total } = getAllPrices(newState);

      newState = {
        ...newState,
        subTotal,
        tax,
        total
      };

      dateCaching(newState);

      return newState;
    }

    case Invoice.Invoice.UseProductManagementActionTypeOptions
      .UPDATE_SHOW_ADD_PRODCUT_MENU: {
      return {
        ...state,
        showAddProductMenu: !state.showAddProductMenu
      };
    }

    case Invoice.Invoice.UseProductManagementActionTypeOptions
      .INITIAL_DATA_FROM_CACHING: {
      if (action.data) {
        action.data.showAddProductMenu = false;
      }

      return action.data || initialState;
    }

    case Invoice.Invoice.UseProductManagementActionTypeOptions.DELETE_ALL_PRODUCTS: {
      return {
        ...state,
        products: []
      };
    }

    default:
      return state;
  }
};

export const useProductManagement = () => {
  let [
    { products, subTotal, total, tax, showAddProductMenu },
    dispatch
  ] = useReducer(reducer, initialState);

  const showAddProductMenuHandler = useCallback(() => {
    dispatch({
      type:
        Invoice.Invoice.UseProductManagementActionTypeOptions
          .UPDATE_SHOW_ADD_PRODCUT_MENU
    });
  }, []);

  const addProductHandler = useCallback(
    (inputs: Invoice.Invoice.InputAsInvoice, callback: () => void) => {
      dispatch({
        type: Invoice.Invoice.UseProductManagementActionTypeOptions.UPDATE_PRODUCTS,
        product: inputs
      });

      callback();
    },
    []
  );

  const removeProductHandler = useCallback((id: string) => {
    dispatch({
      type: Invoice.Invoice.UseProductManagementActionTypeOptions.DELETE_PRODUCT,
      id
    });
  }, []);

  const removeAllProductsHandler = useCallback(() => {
    dispatch({
      type: Invoice.Invoice.UseProductManagementActionTypeOptions.DELETE_ALL_PRODUCTS
    });

    localForage.removeItem(Invoice.Invoice.IndexDBTermsOptions.PRODUCTS);
  }, []);

  useEffect(() => {
    localForage
      .getItem(Invoice.Invoice.IndexDBTermsOptions.PRODUCTS)
      .then((data: string) => JSON.parse(data))
      .then((parsedData: Invoice.Invoice.UseProductManagementStateOption) => {
        dispatch({
          type:
            Invoice.Invoice.UseProductManagementActionTypeOptions
              .INITIAL_DATA_FROM_CACHING,

          data: parsedData
        });
      });
  }, []);

  return {
    products,
    subTotal,
    tax,
    total,
    showAddProductMenu,
    showAddProductMenuHandler,
    addProductHandler,
    removeProductHandler,
    removeAllProductsHandler
  };
};
