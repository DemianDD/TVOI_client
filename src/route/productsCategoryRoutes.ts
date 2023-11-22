import { lazy } from 'react';
import { translateText } from '../services/translation.service';

export interface IProductCategoryRoute {
    title: string;
    category: string;
    path: string;
    header: string;
    translationKey: string;
    imageUrl: string;
}

export const productCategoryRoutes: IProductCategoryRoute[] = [{
    title: translateText("bracelet|A"),
    category: "bracelets",
    path: "bracelets",
    header: "Браслети: купити браслет срібний мінімалістичний бренд недорого Львів, Київ, Україна",
    translationKey: "bracelet|A",
    imageUrl:
      "https://live.staticflickr.com/65535/52644212936_ef90a44d8e_z.jpg",
},{
    title: translateText("watches|A"),
    category: "watches",
    path: "watches",
    header: "Годинники: купити годинник швейцарський бренд недорого Львів, Київ, Україна",
    translationKey: "watches|A",
    imageUrl:
      "https://live.staticflickr.com/65535/52705771347_a428c9ea9e_z.jpg",
},{
    title: translateText("necklace|A"),
    category: "necklaces",
    path: "necklaces",
    header: "Ланцюжки: купити ланцюжок кольє цепочка срібна мінімалістична брендовий недорого Львів, Київ, Україна",
    translationKey: "necklace|A",
    imageUrl:
      "https://live.staticflickr.com/65535/52704645738_d29428af3c_z.jpg",
},{
    title: translateText("earrings|A"),
    category: "earrings",
    path: "earrings",
    header: "Сережки: купити сережки кульчики срібні мінімалістичні брендові недорого Львів, Київ, Україна",
    translationKey: "earrings|A",
    imageUrl:
      "https://live.staticflickr.com/65535/52643708052_2047f0dccb_z.jpg",
},{
    title: translateText("rings|A"),
    category: "rings",
    path: "rings",
    header: "Каблучки: купити каблучку колечко кільця срібна мінімалістична брендова недорого Львів, Київ, Україна",
    translationKey: "rings|A",
    imageUrl:
      "https://live.staticflickr.com/65535/52740011306_f60a9a4a00_z.jpg",
},{
    title: translateText("charm|A"),
    category: "charms",
    path: "charms",
    header: "Намистини: купити намистини шарми срібні мінімалістині брендові недорого Львів, Київ, Україна",
    translationKey: "charm|A",
    imageUrl:
      "https://live.staticflickr.com/65535/52780363265_63e645bab3_z.jpg",
},{
    title: translateText("accessories|A"),
    category: "accessories",
    path: "accessories",
    header: "Аксесуари: купити сумку для дівчини жінки придбати окуляри чоловічі жіночі ремінці аксесуари",
    translationKey: "accessories|A",
    imageUrl:
      "https://thumbs2.imgbox.com/20/99/r87tcmsr_t.png",
},{
    title: translateText("hot sales|A"),
    category: "sales",
    path: "sales",
    header: "Знижки: акції на срібло, позолота до -50%, дешеві прикраси | TVOI",
    translationKey: "hot sales|A",
    imageUrl:
      "https://live.staticflickr.com/65535/52644655120_9c321849d3_z.jpg",
},{
    title: translateText("for you|A"),
    category: "collection",
    path: "collection",
    header: "Розпродаж: срібні прикраси дешево срібло 925 | TVOI",
    translationKey: "",
    imageUrl: "",
}
];

export const categoriesRender = productCategoryRoutes.filter(category => category.translationKey.length !== 0);

const Home = lazy(() => import('../pages/Home'));
const Basket = lazy(() => import('../components/Cart/Basket'));
const UserData = lazy(() => import('../components/Cart/Order/UserData'));
const ShippingData = lazy(() => import('../components/Cart/Order/ShippingData'));
const OrderSuccess = lazy(() => import('../components/Cart/Order/OrderSuccess'));
const Product = lazy(() => import('../pages/Product'));
const SearchPage = lazy(() => import('../pages/SearchPage'));

export const routes = [
  {
    path: '',
    element: Home,
  },
  {
    path: 'cart',
    element: Basket,
  },
  {
    path: 'user_info',
    element: UserData,
  },
  {
    path: 'shipping_info',
    element: ShippingData,
  },
  {
    path: 'order_confirmation',
    element: OrderSuccess,
  },
  {
    path: 'product/:id',
    element: Product,
  },
  {
    path: 'search',
    element: SearchPage,
  },
];
