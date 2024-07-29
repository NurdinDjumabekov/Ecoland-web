import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../env";

////// fns
import { changeActiveSelectCategory, clearSaleDiscountFN } from "./stateSlice";
import { changeActiveSelectWorkShop } from "./stateSlice";
import { clearLogin } from "./stateSlice";
import { clearTemporaryData } from "./stateSlice";
import { changeLocalData } from "./saveDataSlice";

////// helpers
import { upsText } from "../../helpers/Data";

/// logInAccount
export const logInAccount = createAsyncThunk(
  "logInAccount",
  async function (props, { dispatch, rejectWithValue }) {
    const { dataLogin, navigate, data } = props;
    try {
      const response = await axios({
        method: "POST",
        url: `${API}/tt/login`,
        data: dataLogin,
      });
      if (response.status >= 200 && response.status < 300) {
        const { result, seller_guid, seller_fio } = response?.data;
        const { point_name, count_type } = response?.data;

        if (+result === 1) {
          const obj = { point_name, count_type, seller_guid, seller_fio };
          dispatch(changeLocalData(obj));

          if (seller_guid) {
            navigate("/");
            dispatch(clearLogin());
          }
        }
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/////////////////////////////// оставки и продажи ///////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

/// getWorkShopsGorSale
/// get все цеха
export const getWorkShopsGorSale = createAsyncThunk(
  "getWorkShopsGorSale",
  async function (props, { dispatch, rejectWithValue }) {
    const { seller_guid } = props;

    const urlLink = `${API}/tt/get_leftover_workshop?seller_guid=${seller_guid}`;

    try {
      const response = await axios(urlLink);
      if (response.status >= 200 && response.status < 300) {
        const { workshop_guid } = response?.data?.[0];
        dispatch(changeActiveSelectWorkShop(workshop_guid));

        if (workshop_guid) {
          dispatch(getCategoryTT({ ...props, workshop_guid }));
        }
        return response.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// getCategoryTT
export const getCategoryTT = createAsyncThunk(
  "getCategoryTT",
  /// для получения катеогрий товаров ТТ
  async function (props, { dispatch, rejectWithValue }) {
    const { location, seller_guid, type, workshop_guid } = props;

    const urlLink = `${API}/tt/get_category?seller_guid=${seller_guid}&workshop_guid=${workshop_guid}`; //// для пр0дажи и остаков
    // console.log(urlLink, "urlLink getCategoryTT");

    try {
      const response = await axios(urlLink);
      if (response.status >= 200 && response.status < 300) {
        const category_guid = response.data?.[0]?.category_guid || "";
        dispatch(changeActiveSelectCategory(category_guid)); /// исользую в продаже и в остатках

        // console.log(workshop_guid, "workshop_guid");

        if (type === "leftovers") {
          if (category_guid) {
            const obj = { seller_guid, category_guid, workshop_guid };
            dispatch(getMyLeftovers(obj));
            //// для страницы остатков вызываю первую категорию
          }
        } else if (type === "sale") {
          if (category_guid) {
            ////// для продажи и с0путки
            const sedData = { guid: category_guid, seller_guid, location };
            dispatch(getProductTT({ ...sedData, workshop_guid }));
            //// get список продуктов сопутки по категориям
            //// сразу подставляю первую категорию
          }
        }
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// getProductTT
export const getProductTT = createAsyncThunk(
  "getProductTT",
  /// для получения продуктов
  async function (props, { dispatch, rejectWithValue }) {
    const { guid, seller_guid, location, workshop_guid } = props;

    const urlLink = `${API}/tt/get_product?categ_guid=${guid}&seller_guid=${seller_guid}&workshop_guid=${workshop_guid}`; ///// продажа и остаков
    // console.log(urlLink, "urlLink getProductTT");
    try {
      const response = await axios(urlLink);
      if (response.status >= 200 && response.status < 300) {
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// searchProdSale
///// для поиска товаров только в продаже!
export const searchProdSale = createAsyncThunk(
  "searchProdSale",
  /// для поиска товаров
  async function (props, { dispatch, rejectWithValue }) {
    const { text, seller_guid } = props;

    const urlLink = `${API}/tt/get_product?search=${text}&seller_guid=${seller_guid}`;
    try {
      const response = await axios(urlLink);
      if (response.status >= 200 && response.status < 300) {
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// getMyLeftovers
export const getMyLeftovers = createAsyncThunk(
  "getMyLeftovers",
  async function (props, { dispatch, rejectWithValue }) {
    const { seller_guid, category_guid, workshop_guid } = props;

    // console.log(category_guid, 'category_guid');

    try {
      const response = await axios({
        method: "GET",
        url: `${API}/tt/get_report_leftovers?seller_guid=${seller_guid}&categ_guid=${category_guid}&workshop_guid=${workshop_guid}`,
      });
      if (response.status >= 200 && response.status < 300) {
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// createInvoiceTT
export const createInvoiceTT = createAsyncThunk(
  "createInvoiceTT",
  /// (открытие кассы) создание накладной торговый точкой на целый день
  async function ({ seller_guid, navigate }, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "POST",
        url: `${API}/tt/create_invoice`,
        data: { seller_guid },
      });
      if (response.status >= 200 && response.status < 300) {
        navigate("/sale/kassa", {
          state: { invoice_guid: response?.data?.guid },
        });
        //// перенаправляю на страницу продажи с guid накладной, куда нуэно записать нынешние продажи

        dispatch(clearSaleDiscountFN()); //// очищаю данные покупателя(клиента)

        return { codeid: response?.data?.codeid, guid: response?.data?.guid };
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// endSaleProds
export const endSaleProds = createAsyncThunk(
  "endSaleProds",
  /// завершение продажи
  async function (props, { dispatch, rejectWithValue }) {
    const { invoice_guid, navigate, user_guid, bonuse } = props;

    try {
      const response = await axios({
        method: "POST",
        url: `${API}/tt/point_sale_confirm`,
        data: { invoice_guid, user_guid, bonuse },
      });

      if (response.status >= 200 && response.status < 300) {
        if (response?.data?.result == 1) {
          navigate("/");
        }

        return response.data.result;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
acceptInvoiceReturn;

/// getBonusCard
export const getBonusCard = createAsyncThunk(
  "getBonusCard",
  /// завершение продажи
  async function (props, { dispatch, rejectWithValue }) {
    const { card_bonus, navigate, invoice_guid } = props;

    try {
      const response = await axios(`${API}/tt/scan_card/?qrcode=${card_bonus}`);

      if (response.status >= 200 && response.status < 300) {
        const obj = { ...response.data, invoice_guid };

        if (obj?.result == 1) {
          await navigate("/card/add_bonus_sale", { state: { obj } });
        } else if (obj?.result == 0) {
          alert("Карта с таким номером не существует!");
        } else if (+obj?.result === -1) {
          alert("Эта карта не пренодлежит никакому клиенту!");
        }

        return response.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// getEveryProd
export const getEveryProd = createAsyncThunk(
  /// получаю каждый продукт по qrcode или guid для продажи
  "getEveryProd",
  async function (props, { dispatch, rejectWithValue }) {
    const { guid, seller_guid, qrcode, navigate } = props;
    const { invoice_guid, closeModal } = props;

    const urlGuid = !!guid ? `&product_guid=${guid}` : "";
    const qrcodeGuid = !!qrcode ? `&qrcode=${qrcode}` : "";

    const url = `${API}/tt/get_product_detail?seller_guid=${seller_guid}${urlGuid}${qrcodeGuid}`;

    try {
      const response = await axios(url);
      if (response.status >= 200 && response.status < 300) {
        if (response?.data?.length === 0) {
          await navigate("/sale/kassa", { state: { invoice_guid } });
          alert("Не удалось найти такой продукт");
        } else {
          const { guid, product_name } = response?.data?.[0];
          const obj = { guid, product_name, invoice_guid };
          if (!!qrcode) {
            await navigate("/sale/kassa", { state: { invoice_guid } });
            await navigate("/sale/every_prod", { state: { obj } });
            ///// закрываю модалку для ввода ручного qr кода
            closeModal();
          }
        }

        return response?.data?.[0];
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// addProductInvoiceTT
export const addProductInvoiceTT = createAsyncThunk(
  /// добавление продукта(по одному) в накладную торговой точки
  "addProductInvoiceTT",
  async function (props, { dispatch, rejectWithValue }) {
    const { data, navigate, count_type } = props;

    try {
      const url = `${API}/tt/create_invoice_product`;
      const response = await axios({ method: "POST", url, data });

      if (response.status >= 200 && response.status < 300) {
        const { result } = response?.data;
        if (+result === 1) {
          dispatch(clearTemporaryData()); // очищаю { price: "", ves: ""}
          navigate(-1);
        }
        return { result, count_type };
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// /// TieCardWithUser
// export const TieCardWithUser = createAsyncThunk(
//   /// привязка карты к пользователю
//   "TieCardWithUser",
//   async function (props, { dispatch, rejectWithValue }) {
//     const { dataSend, navigate } = props;
//     try {
//       const url = `${API}/tt/create_client/`;
//       const response = await axios({ method: "POST", url, data: dataSend });
//       if (response.status >= 200 && response.status < 300) {
//         console.log(response?.data, "response?.data");
//         if (response?.data?.result == 1 || response?.data?.result == 0) {
//           navigate("/");
//         }

//         return { result: response?.data?.result };
//       } else {
//         throw Error(`Error: ${response.status}`);
//       }
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

//// TieCardWithUser
export const TieCardWithUser = createAsyncThunk(
  ///// привязка карты к пользователю
  "TieCardWithUser",
  async function (props, { dispatch, rejectWithValue }) {
    const { dataSend, navigate } = props;
    try {
      const url = `${API}/tt/create_client/`;
      const response = await axios({ method: "POST", url, data: dataSend });
      if (response.status >= 200 && response.status < 300) {
        if (response?.data?.result == 1 || response?.data?.result == 0) {
          console.log(response?.data, "response?.data");
          navigate("/");
        }

        return { result: response?.data?.result };
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//// getListSoldInvoice
export const getListSoldInvoice = createAsyncThunk(
  /// список проданных товаров
  "getListSoldInvoice",
  async function (seller_guid, { dispatch, rejectWithValue }) {
    try {
      const url = `${API}/tt/get_point_invoice?seller_guid=${seller_guid}`;
      const response = await axios(url);
      if (response.status >= 200 && response.status < 300) {
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//// getListSoldProd
export const getListSoldProd = createAsyncThunk(
  /// список проданных товаров
  "getListSoldProd",
  async function (invoice_guid, { dispatch, rejectWithValue }) {
    try {
      const url = `${API}/tt/get_point_invoice_product?invoice_guid=${invoice_guid}`;
      const response = await axios(url);
      if (response.status >= 200 && response.status < 300) {
        console.log(response?.data, "asdasd32");
        return response?.data?.[0];
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//// deleteSoldProd
export const deleteSoldProd = createAsyncThunk(
  /// удаление данных из списока проданных товаров
  "deleteSoldProd",
  async function (props, { dispatch, rejectWithValue }) {
    const { product_guid, getData } = props;

    try {
      const response = await axios({
        method: "POST",
        url: `${API}/tt/del_product`,
        data: { product_guid },
      });
      if (response.status >= 200 && response.status < 300) {
        getData();
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/////////////////////////////// Return ///////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

/// getMyReturnInvoice
export const getMyReturnInvoice = createAsyncThunk(
  "getMyReturnInvoice",
  /// для получения всех накладных воврата
  async function (seller_guid, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `${API}/tt/get_invoice_return?seller_guid=${seller_guid}`,
      });
      if (response.status >= 200 && response.status < 300) {
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// getMyEveryInvoiceReturn
export const getMyEveryInvoiceReturn = createAsyncThunk(
  "getMyEveryInvoiceReturn",
  /// для получения каждой накладной со списком товаров для возарата товара
  async function (guid, { dispatch, rejectWithValue }) {
    try {
      const url = `${API}/tt/get_point_invoice_product?invoice_guid=${guid}`;
      const response = await axios(url);
      if (response.status >= 200 && response.status < 300) {
        return response?.data?.[0]?.list;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// acceptInvoiceReturn
export const acceptInvoiceReturn = createAsyncThunk(
  "acceptInvoiceReturn",
  /// для принятия накладной возврата торговой точкой
  async function (props, { rejectWithValue }) {
    const { seller_guid, listReturn, navigate } = props;
    const invoice_guid = listReturn?.[0]?.invoice_guid;

    try {
      const response = await axios({
        method: "POST",
        url: `${API}/tt/confirm_invoice_return`,
        data: { seller_guid, listReturn, invoice_guid },
      });

      if (response.status >= 200 && response.status < 300) {
        if (response.data.status == 1) {
          navigate("/");
        }
        return response.data.status;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  preloader: false,
  chech: "",

  listWorkShopSale: [], //// список цехов для продаж
  listCategory: [], //  список категорий ТА
  listProductTT: [], //  список продуктов ТА (cписок прод-тов отсортированные селектами)
  listLeftovers: [], // список остатков

  /////////// sale //////////////
  listSoldInvoice: [], /// список накладных с проданными товарами
  listSoldProd: {}, /// список проданных товаров
  everyProdSale: [], /// список проданных товаров

  listProdSearch: [], /// храню данные поиска в продаже товара

  infoKassa: { guid: "", codeid: "" }, /// guid каждой накладной ТТ

  listActionLeftovers: [], // список остатков (переделанный мною) для возврата накладной и ревизии

  /////// return ///////
  listMyInvoiceReturn: [], ///// список накладных для возврата
  everyInvoiceReturn: [], //// каждая накладная возврата
};

const requestSlice = createSlice({
  name: "requestSlice",
  initialState,
  extraReducers: (builder) => {
    //// logInAccount
    builder.addCase(logInAccount.fulfilled, (state, action) => {
      state.preloader = false;
    });
    builder.addCase(logInAccount.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      alert("Неверный логин или пароль");
    });
    builder.addCase(logInAccount.pending, (state, action) => {
      state.preloader = true;
    });

    ///// getWorkShopsGorSale
    builder.addCase(getWorkShopsGorSale.fulfilled, (state, action) => {
      state.preloader = false;
      state.listWorkShopSale = action?.payload?.map(
        ({ workshop, workshop_guid }, ind) => ({
          label: `${ind + 1}. ${workshop}`,
          value: workshop_guid,
        })
      );
    });
    builder.addCase(getWorkShopsGorSale.rejected, (state, action) => {
      state.error = action.payload;
      alert("Упс, что-то пошло не так!");
      state.preloader = false;
    });
    builder.addCase(getWorkShopsGorSale.pending, (state, action) => {
      state.preloader = true;
    });

    //// createInvoiceTT
    builder.addCase(createInvoiceTT.fulfilled, (state, action) => {
      const { codeid, guid } = action.payload;
      state.preloader = false;
      state.infoKassa = { codeid, guid };
    });
    builder.addCase(createInvoiceTT.rejected, (state, action) => {
      state.error = action.payload;
      alert("Упс, что-то пошло не так! Не удалось создать накладную");
      state.preloader = false;
    });
    builder.addCase(createInvoiceTT.pending, (state, action) => {
      state.preloader = true;
    });

    /////// endSaleProds
    builder.addCase(endSaleProds.fulfilled, (state, action) => {
      state.preloader = false;
      if (action.payload === 1) {
        alert("Успешно продано!");
      }
    });
    builder.addCase(endSaleProds.rejected, (state, action) => {
      state.error = action.payload;
      // alert("Упс, что-то пошло не так! Не удалось продать");
      state.preloader = false;
    });
    builder.addCase(endSaleProds.pending, (state, action) => {
      state.preloader = true;
    });

    /////// getBonusCard
    builder.addCase(getBonusCard.fulfilled, (state, action) => {
      state.preloader = false;
    });
    builder.addCase(getBonusCard.rejected, (state, action) => {
      state.error = action.payload;
      alert("Упс, что-то пошло не так! Не удалось отсканировать карту");
      state.preloader = false;
    });
    builder.addCase(getBonusCard.pending, (state, action) => {
      state.preloader = true;
    });

    /////// getCategoryTT
    builder.addCase(getCategoryTT.fulfilled, (state, action) => {
      state.preloader = false;
      state.listCategory = action?.payload?.map(
        ({ category_name, category_guid }, ind) => ({
          label: `${ind + 1}. ${category_name}`,
          value: category_guid,
        })
      );
    });
    builder.addCase(getCategoryTT.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getCategoryTT.pending, (state, action) => {
      state.preloader = true;
    });

    ////// getProductTT
    builder.addCase(getProductTT.fulfilled, (state, action) => {
      // state.preloader = false;
      state.listProductTT = action.payload;
    });
    builder.addCase(getProductTT.rejected, (state, action) => {
      state.error = action.payload;
      // state.preloader = false;
    });
    builder.addCase(getProductTT.pending, (state, action) => {
      // state.preloader = true;
    });

    /////// searchProdSale
    builder.addCase(searchProdSale.fulfilled, (state, action) => {
      state.listProdSearch = action.payload;
    });
    builder.addCase(searchProdSale.rejected, (state, action) => {
      state.error = action.payload;
      state.listProdSearch = [];
    });
    builder.addCase(searchProdSale.pending, (state, action) => {});

    //////// getMyLeftovers
    builder.addCase(getMyLeftovers.fulfilled, (state, action) => {
      // state.preloader = false;
      state.listLeftovers = action?.payload;
    });
    builder.addCase(getMyLeftovers.rejected, (state, action) => {
      state.error = action.payload;
      // state.preloader = false;
      alert("Упс, что-то пошло не так! Не удалось загрузить данные");
    });
    builder.addCase(getMyLeftovers.pending, (state, action) => {
      // state.preloader = true;
    });

    /////// addProductInvoiceTT
    builder.addCase(addProductInvoiceTT.fulfilled, (state, action) => {
      /// 0 - error
      /// 1 - продукт добавлен
      /// 2 - Введенное количество товара больше доступного количества.
      state.preloader = false;
      +action.payload.result == 1
        ? alert("Товар продан!")
        : alert(
            "Ошибка!",
            `${
              +action.payload?.count_type == 1
                ? "Введенное количество товара больше доступного вам количества."
                : "Введенная сумма товара больше доступного вам количества."
            } `
          );
    });
    builder.addCase(addProductInvoiceTT.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      alert("Упс, что-то пошло не так! Не удалось продать товар!");
      // alert(
      //   "Ошибка!",
      // `${
      //   +action.payload?.unit_codeid == 1
      //     ? "Введенное количество товара больше доступного вам количества."
      //     : "Введенная сумма товара больше доступного вам количества."
      // } `
      // );
    });
    builder.addCase(addProductInvoiceTT.pending, (state, action) => {
      state.preloader = true;
    });

    /////// TieCardWithUser
    builder.addCase(TieCardWithUser.fulfilled, (state, action) => {
      /// 0 - error
      /// 1 - карту приязана успешно
      /// -1 - Данная карта не активна!
      /// -2 - Данная карта занята!
      /// -3 - клиент с таким номером уже существует!
      state.preloader = false;
      const { result } = action.payload;

      if (result == 1 || result == 0) {
        alert("Карта была успешно привязана");
      } else if (result == -1) {
        alert("Неверный номер карты");
      } else if (result == -2) {
        alert("Данная карта занята другим пользователем");
      } else if (result == -3) {
        alert("Клиент с таким номером уже существует!");
      }
    });
    builder.addCase(TieCardWithUser.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      // alert("Упс, что-то пошло не так! Не удалось привязать карту!");
    });
    builder.addCase(TieCardWithUser.pending, (state, action) => {
      state.preloader = true;
    });

    ////////getEveryProd
    builder.addCase(getEveryProd.fulfilled, (state, action) => {
      state.preloader = false;
      state.everyProdSale = action.payload;
    });
    builder.addCase(getEveryProd.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      state.everyProdSale = {};
    });
    builder.addCase(getEveryProd.pending, (state, action) => {
      state.preloader = true;
    });

    /////// getListSoldInvoice
    builder.addCase(getListSoldInvoice.fulfilled, (state, action) => {
      state.preloader = false;
      state.listSoldInvoice = action.payload;
    });
    builder.addCase(getListSoldInvoice.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      state.listSoldInvoice = [];
      alert(upsText);
    });
    builder.addCase(getListSoldInvoice.pending, (state, action) => {
      state.preloader = true;
    });

    /////// getListSoldProd
    builder.addCase(getListSoldProd.fulfilled, (state, action) => {
      state.preloader = false;
      state.listSoldProd = action.payload;
    });
    builder.addCase(getListSoldProd.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      state.listSoldProd = {};
      alert(upsText);
    });
    builder.addCase(getListSoldProd.pending, (state, action) => {
      state.preloader = true;
    });

    /////// deleteSoldProd
    builder.addCase(deleteSoldProd.fulfilled, (state, action) => {
      state.preloader = false;
    });
    builder.addCase(deleteSoldProd.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      alert("Упс, что-то пошло не так! Не удалось удалить...");
    });
    builder.addCase(deleteSoldProd.pending, (state, action) => {
      state.preloader = true;
    });

    /////////////////////////////// Return ///////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////

    //// getMyReturnInvoice
    builder.addCase(getMyReturnInvoice.fulfilled, (state, action) => {
      state.preloader = false;
      state.listMyInvoiceReturn = action.payload;
    });
    builder.addCase(getMyReturnInvoice.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getMyReturnInvoice.pending, (state, action) => {
      state.preloader = true;
    });

    //// getMyEveryInvoiceReturn
    builder.addCase(getMyEveryInvoiceReturn.fulfilled, (state, action) => {
      state.preloader = false;
      const newListProd = action.payload?.map((i) => ({ ...i, returnProd: 0 }));
      state.everyInvoiceReturn = newListProd;
    });
    builder.addCase(getMyEveryInvoiceReturn.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getMyEveryInvoiceReturn.pending, (state, action) => {
      state.preloader = true;
    });

    ///// acceptInvoiceReturn
    builder.addCase(acceptInvoiceReturn.fulfilled, (state, action) => {
      state.preloader = false;
      if (action.payload == 1) {
        alert("Возврат успешно оформлен");
      } else {
        alert("Не удалось оформить накладную для возврата");
      }
    });
    builder.addCase(acceptInvoiceReturn.rejected, (state, action) => {
      state.error = action.payload;
      alert(
        "Упс, что-то пошло не так! Не удалось оформить накладную для возврата"
      );
      state.preloader = false;
    });
    builder.addCase(acceptInvoiceReturn.pending, (state, action) => {
      state.preloader = true;
    });
  },

  reducers: {
    changePreloader: (state, action) => {
      state.preloader = action.payload;
    },

    clearLeftovers: (state, action) => {
      state.listLeftovers = [];
    },

    clearListProductTT: (state, action) => {
      state.listProductTT = [];
    },

    clearListCategory: (state, action) => {
      state.listCategory = [];
    },

    changeListActionLeftovers: (state, action) => {
      state.listActionLeftovers = action.payload;
    },

    clearListProdSearch: (state, action) => {
      state.listProdSearch = [];
    },

    changeEveryInvoiceReturn: (state, action) => {
      state.everyInvoiceReturn = action.payload;
    },

    changeInfoKassaSale: (state, action) => {
      state.infoKassa = action.payload;
    },
  },
});

export const {
  changePreloader,
  clearLeftovers,
  clearListProductTT,
  clearListCategory,
  changeListActionLeftovers,
  clearListProdSearch,
  changeEveryInvoiceReturn,
  changeInfoKassaSale,
} = requestSlice.actions;

export default requestSlice.reducer;
