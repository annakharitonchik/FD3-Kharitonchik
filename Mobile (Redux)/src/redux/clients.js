import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataLoadState: 0, // 0 - not loaded, 1 - is loading, 2 - loaded, 3 - error
  dataLoadError: null,
  companyName: "",
  clientsArr: [],
  clientKey: 125,
};

export const clientsSlice = createSlice({
  name: "companyData",
  initialState,
  reducers: {
    updateLoadState: (state, action) => {
      state.dataLoadState = action.payload.state;
      state.dataLoadError = action.payload.error;
    },

    updateData: (state, action) => {
      state.companyName = action.payload.companyName;
      state.clientsArr = action.payload.clientsArr;
    },
    textChanged: (state, action) => {
      let { id, fam, im, otch, balance } = action.payload;
      let newClients =
        state.clientsArr &&
        state.clientsArr.map((client) => {
          if (id === client.id) {
            return {
              ...client,
              fam,
              im,
              otch,
              balance,
            };
          }
          return client;
        });
      state.clientsArr = newClients;
    },
    deleteClient: (state, action) => {
      state.clientsArr =
        state.clientsArr &&
        state.clientsArr.filter((client) => action.payload.id !== client.id);
    },

    addClient: (state) => {
      state.clientsArr = state.clientsArr && [
        ...state.clientsArr,
        {
          fam: "",
          im: "",
          otch: "",
          balance: 0,
          id: state.clientKey,
        },
      ];
      state.clientKey += 5;
    },
  },
});

export const {
  updateLoadState,
  updateData,
  textChanged,
  deleteClient,
  addClient,
} = clientsSlice.actions;

export const getCompanyData = () => async (dispatch) => {
  try {
    dispatch(updateLoadState({ state: 1, error: null }));
    const response = await fetch(
      "https://fe.it-academy.by/Examples/mobile_company.json"
    );
    if (response.ok) {
      const data = await response.json();
      dispatch(updateLoadState({ state: 2, error: null }));
      dispatch(updateData(data));
    } else {
      dispatch(
        updateLoadState({ state: 3, error: "HTTP error " + response.status })
      );
    }
  } catch (err) {
    dispatch(updateLoadState({ state: 3, error: err.message }));
  }
};

export default clientsSlice.reducer;
