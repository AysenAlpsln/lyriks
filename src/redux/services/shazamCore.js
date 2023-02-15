import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

/*const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'cb2675f920msha2c0fa338db250cp1a52bcjsnbe27a82b917c',
    'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
  }
};

fetch('https://shazam-core.p.rapidapi.com/v1/charts/world', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));*/


// Yorum satırında bulunan alanın createApi ile yapılmış versiyonu.
export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', 'cb2675f920msha2c0fa338db250cp1a52bcjsnbe27a82b917c')
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => 'charts/world' }),
  }),
});

export const {
  useGetTopChartsQuery,
} = shazamCoreApi;