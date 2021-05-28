import { CSSProperties } from "react";

export namespace Invoice {
  type showAddProductHandler = () => void;

  export type CompanyInvoiceBuildOptions<T> = (...args: T[]) => InvoiceFromOptions;

  interface RemoverAllProducts {
    removerAllProductshandler?: () => void;
  }

  export interface ModalContextOptions {
    isShow: boolean;
    modalHandler: (action: boolean) => void;
  }

  interface InvoiceReportOptions {
    id: string;

    invoiceInfo: {
      name: string;
      email: string;
      address: string;
    };

    products: ProductsOptions[];
    subTotal: number;
    tax: number;
    total: number;
    createdAt: string;
  }

  export type InvoicesReportOpetions = {
    invoicesReport: InvoiceReportOptions[];
    error: string;
  };

  export interface ProductsReportModalOptions {
    products: ProductsOptions[];
  }

  export interface InvoicesReportComponentsOptions
    extends Omit<InvoicesReportOpetions, "error"> {}

  export interface TableReportOptions extends InvoicesReportComponentsOptions {}

  export interface InvoiceItemReportOptions extends InvoiceReportOptions {
    index?: number;
    selectInvoiceHandler: (index: number) => void;
  }

  export interface ProductsReportContextOptions {
    products: ProductsOptions[];
    productsReportHandler: (products: ProductsOptions[]) => void;
  }

  export interface ModalOptions {
    action: "success" | "error";
    content: string;
  }

  export interface ErrorOptions {
    error: string;
    errorHandler: (error: string) => void;
  }

  export interface HeaderOptions extends RemoverAllProducts {
    loading?: boolean;
    products?: ProductsOptions[];
    button?: JSX.Element;
    showAddProductHandler?: showAddProductHandler;
  }

  export type FetchDataHandlerOptions = (
    url: string,
    method: "POST" | "GET",
    data?: {}
  ) => {};

  interface FetchDataOptions {
    loading: boolean;
    fetchInvoice: FetchDataHandlerOptions;
  }

  export interface ClientInvoiceOptions
    extends ProductsPriceOptions,
      RemoverAllProducts,
      FetchDataOptions {
    products: ProductsOptions[];
  }

  export interface BackDropOptions {
    onClick: () => void;
  }

  export interface UseProductManagementStateOption extends ProductsPriceOptions {
    products: ProductsOptions[];
    showAddProductMenu: boolean;
  }

  export enum UseProductManagementActionTypeOptions {
    INITIAL_DATA_FROM_CACHING,
    UPDATE_PRODUCTS,
    DELETE_PRODUCT,
    UPDATE_SHOW_ADD_PRODCUT_MENU,
    DELETE_ALL_PRODUCTS
  }

  export enum InputNameOptions {
    TITLE = "title",
    DESCRIPTION = "description",
    PRICE = "price",
    QUANTITY = "quantity",
    NAME = "name",
    EMAIL = "email",
    ADDRESS = "address",
    PASSWORD = "password"
  }

  interface UpdateProductsOptions {
    type: UseProductManagementActionTypeOptions.UPDATE_PRODUCTS;
    product: InputAsProduct;
  }

  interface UpdateShowAddProductMenuOptions {
    type: UseProductManagementActionTypeOptions.UPDATE_SHOW_ADD_PRODCUT_MENU;
  }

  interface DeleteProductOptions {
    type: UseProductManagementActionTypeOptions.DELETE_PRODUCT;
    id: string;
  }

  interface InitialDataFromCachingOptions {
    type: UseProductManagementActionTypeOptions.INITIAL_DATA_FROM_CACHING;
    data: UseProductManagementStateOption;
  }

  interface DeleteAllProductsOptions {
    type: UseProductManagementActionTypeOptions.DELETE_ALL_PRODUCTS;
  }

  export type UseProductManagementActionOptions =
    | UpdateProductsOptions
    | UpdateShowAddProductMenuOptions
    | DeleteProductOptions
    | InitialDataFromCachingOptions
    | DeleteAllProductsOptions;

  interface InvoiceOptions {
    date: string;
  }

  interface ShowAddProductOptions {
    showAddProductMenu?: boolean;
  }

  interface ShowAddProductMenuOptions extends ShowAddProductOptions {
    showAddProductHandler: showAddProductHandler;

    addProductHandler: (
      args: { [key: string]: { [key: string]: string | boolean } },
      callback?: () => void
    ) => void;
  }

  interface RemoveProductHandler {
    removeProductHandler?: (id: string) => void;
  }

  export interface ProductsOptions extends RemoveProductHandler {
    _id?: string;
    id: string;
    title: string;
    price: number;
    quantity: number;
    total: number;
    description: string;
    index?: number;
  }

  export interface ProductsPriceOptions {
    subTotal: number;
    tax: number;
    total: number;
  }

  export interface FinalProductsOptions extends ProductsPriceOptions {
    products: ProductsOptions[];
    inputs: InputAsInvoice;
  }

  export interface ProductListOptions
    extends ProductsPriceOptions,
      RemoveProductHandler {
    products: ProductsOptions[];
  }

  export interface HomeOptions {
    invoiceFrom: InvoiceFromOptions;
    invoice: InvoiceOptions;
    invoiceNumber: number;
  }

  export interface HomeComponentsOptions
    extends HomeOptions,
      ProductListOptions,
      RemoveProductHandler,
      ShowAddProductMenuOptions,
      RemoverAllProducts {}

  export interface AddProductOptions extends ShowAddProductMenuOptions {}

  export interface CompanyInvoiceOptions extends InvoiceFromOptions, InvoiceOptions {
    invoiceNumber: number;
    invoiceNum: number;
  }

  export interface ButtonOptions {
    label: string;
    type: string;
    style?: CSSProperties;
    disabled?: boolean;
    onClick?: () => void;
  }

  export interface InvoiceFromOptions {
    marketer: string;
    phone: string;
    email: string;
  }

  export interface OnInputOptions {
    name: string;
    value: string;
    isValid: boolean;
  }

  interface RemoveAllInputsValue {
    removeAllInputsValueHandler?: () => void;
  }

  export interface InputsOptions {
    isLogin: boolean;
    onInput: (args: OnInputOptions) => void;
  }

  export interface InputOptions {
    type: string;
    name: string;
    placeholder?: string;
    errorText?: string;
    isSmall?: boolean;
    inputs?: InputAsInvoice;
    onInput: (args: OnInputOptions) => void;
  }

  interface InputAsProduct {
    [key: string]: {
      value: string;
      isValid: boolean;
    };
  }

  export interface InputAsInvoice extends InputAsProduct {}

  export interface UseFormValidationStateOptions extends RemoveAllInputsValue {
    inputs: InputAsProduct;
    isFormValid: boolean;
    onInput?: (args: OnInputOptions) => void;
    formSwitchHandler?: (isLogin: boolean) => void;
  }

  export type ValidationOptions = (...args: { [key: string]: string }[]) => boolean;

  export enum IndexDBTermsOptions {
    PRODUCTS = "products"
  }
}
