import { lazy } from 'react';
const Collections = lazy(() => import('../collections'));
const PayLoad = lazy(() => import('../Payload'));
const BuyInfo = lazy(() => import('./../Buy_info'));
const Home = lazy(() => new Promise((rej, rec) => {
  setTimeout(() => {
    rej(import('./../Content'))
  }, 2000);
}));
const Cart = lazy(() => import('../cart'));

const HomeLoad = lazy(() => import("./../loading/homeload.js"));
// const 

export const API_ENDPOINT = 'http://localhost:3000';
export const STATUSES = [
  {
    value: 0,
    label: "READY"
  },
  {
    value: 1,
    label: "IN PROGRESS"
  },
  {
    value: 2,
    label: "COMPLETED"
  },
];


export const STATUS_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  UPDATED: 202
};


const Page = [

  {
    path: '/product/:title',
    exact: true,
    main: BuyInfo
  },
  {
    path: '/checkouts/thanhtoan',
    exact: true,
    main: PayLoad
  },
  {
    path: '/collections/nam',
    exact: true,
    main: Collections
  },
  {
    path: '/cart',
    exact: true,
    main: Cart
  },
  {
    path: 'loading',
    exact: true,
    main: HomeLoad
  },
  {
    path: '/',
    exact: true,
    main: Home
  },
  {
    main: Home
  }
  // {
  //   path: 'checkouts/thanhtoan',
  //   exact: true,
  //   main: PayLoad
  // },
]

export default Page;