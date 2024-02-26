import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ProductData {
  product_name: string;
  product_description?: string;
  category_id: number;
  sub_category_name: string;
  product_status: string;
  is_unique?: boolean;
  price: string;
  photos: Array<{
    id: number;
    main: boolean;
    product_photo: string;
    timestamp: string;
  }>;
  product_characteristic: {
    parameters?: Array<{
      length: string;
      width: string;
      weight: string;
      size: null | string;
    }>;
    coating?: string[];
    colors?: string[];
    deadline?: string;
    decorative_elements?: string[];
    metals?: string[];
    other?: string[];
    stones?: string[];
    textiles?: string[];
    care_instructions?: string;
  };
  method_of_payment: {
    cardPayment: boolean;
    cashPayment: boolean;
    securePayment: boolean;
  };
  delivery_post: {
    novaPost: boolean;
    ukrPost: boolean;
  };
  is_return?: boolean;
  is_active?: boolean;
  id: number;
  time_added: string;
  time_modifeid: string;
}

interface ProductState {
  products: ProductData[];
}

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setAllProducts: (state, action: PayloadAction<ProductData[]>) => {
      state.products = action.payload;
    },
    setProductStatus: (
      state,
      action: PayloadAction<{ productId: number; productStatus: string }>,
    ) => {
      const { productId, productStatus } = action.payload;
      const product = state.products.find((item) => item.id === productId);

      if (product) {
        product.product_status = productStatus;
      }
    },
  },
});

export const { setAllProducts, setProductStatus } = productSlice.actions;

export default productSlice.reducer;
