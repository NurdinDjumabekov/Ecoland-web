import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dataLogin: { login: '', password: '' },

  temporaryData: { price: '', ves: '', guid: '' },
  // временные данные для добавление товаров в сопутку, возврат и продажу

  activeSelectCategory: '',
  /// хранение активной категории, для сортировки товаров(храню guid категории)

  activeSelectWorkShop: '',
  /// хранение активного Цеха для сортировки категорий(храню guid Цеха)

  searchProd: '', /// для текста поиска продуктов

  dataCard: { fio: '', phone: '', card: '' }, //// для заолнения данных карты к привязке

  saleDiscount: { bonuse: 0, user_guid: 0, fio: '' }, //// данные для бонусов
};

const stateSlice = createSlice({
  name: 'stateSlice',
  initialState,
  reducers: {
    changeDataLogin: (state, action) => {
      state.dataLogin = action.payload;
    },
    clearLogin: (state) => {
      state.dataLogin = { login: '', password: '' };
    },

    changeTemporaryData: (state, action) => {
      state.temporaryData = action.payload;
    },

    clearTemporaryData: (state, action) => {
      state.temporaryData = { price: '', ves: '', guid: '' };
    },

    changeActiveSelectCategory: (state, action) => {
      state.activeSelectCategory = action.payload;
    },

    changeActiveSelectWorkShop: (state, action) => {
      state.activeSelectWorkShop = action.payload;
    },

    changeSearchProd: (state, action) => {
      state.searchProd = action.payload;
    },

    dataCardFN: (state, action) => {
      state.dataCard = action.payload;
    },

    saleDiscountFN: (state, action) => {
      state.saleDiscount = action.payload;
    },

    clearSaleDiscountFN: (state, action) => {
      state.saleDiscount = { bonuse: 0, user_guid: 0, fio: '' };
    },
  },
});
export const {
  changeDataLogin,
  clearLogin,
  changeTemporaryData,
  clearTemporaryData,
  changeActiveSelectCategory,
  changeActiveSelectWorkShop,
  changeSearchProd,
  dataCardFN,
  saleDiscountFN,
  clearSaleDiscountFN,
} = stateSlice.actions;

export default stateSlice.reducer;
