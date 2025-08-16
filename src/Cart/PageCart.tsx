import LogoComponet from "../homePages/TopPar/subcompnet/logo";
import Sonedbar from "../homePages/sonedbar/sounedbar";
import Profilthngs from "../homePages/TopPar/subcompnet/profileavftar";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, CardHeader } from "@mui/material";
import type { CartUserData } from "./schemaproductcard";
import { useEffect } from "react";
import { useRef } from "react";
import type { RootState } from "../SateRedux/Store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import type { FormordertoBack } from "./OrdertoBackShema";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { Box, Card, CardContent, Typography } from "@mui/material";
import {
  Delateallaftrbuy,
  Delateallaftrbuybeforebu,
  injectionCartItem,
} from "../SateRedux/slice/CurrentCart";
import axios from "axios";
interface Window {
  paypal: any;
}
const GetUserCart = gql`
  query {
    getCartUser {
      cartid
      userId
      productid
      product {
        nameProduct
        description
        price
        productDetails {
          brand
        }
        productThing {
          imageURL
        }
        attributeValues {
          value
          categoryAttribute {
            key
          }
        }
      }
    }
  }
`;

function PayPalButton() {
  const paypalRef = useRef<HTMLDivElement | null>(null);
  const slectCart = useSelector((stat: RootState) => stat.userCart);

  const Cartinsertdelate = useDispatch();

  useEffect(() => {
    if (!window.paypal) return;

    // تنظيف الزر القديم (لو موجود)
    if (paypalRef.current) {
      paypalRef.current.innerHTML = "";
    }

    const clucamount = slectCart.reduce((total, item) => total + item.price, 0);
    if (clucamount <= 0) return;

    window.paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          console.log("dasd", clucamount);
          return actions.order.create({
            purchase_units: [
              {
                amount: { value: clucamount },
              },
            ],
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            const orderId = details.id; // هذا هو معرف الطلب

            Cartinsertdelate(Delateallaftrbuy());
            alert("Transaction completed by " + details.payer.name.given_name);
            const Listidproduc: number[] = [];
            slectCart.map((pr) => {
              Listidproduc.push(pr.idProduct);
            });
            console.log("ad:", Listidproduc);
            const FormoBacked: FormordertoBack = {
              idorder: orderId,
              idsproducts: slectCart.map((pr) => {
                return pr.idProduct;
              }),
            };
            axios
              .post("http://localhost:9090/putOrder", FormoBacked, {
                withCredentials: true,
              })
              .then((Re) => console.log("res:", Re))
              .catch((err) => {
                console.log(err);
              });
          });
        },
      })
      .render(paypalRef.current);

    return () => {
      if (paypalRef.current) {
        paypalRef.current.innerHTML = "";
      }
    };
  }, [slectCart]);

  return <div ref={paypalRef} />;
}

export default function CartPage() {
  const Cartinsert = useDispatch();
  useEffect(() => {
    Cartinsert(Delateallaftrbuy());
  }, []);
  const addToCart = (item: any) => {
    Cartinsert(
      injectionCartItem({
        idProduct: item.productid,
        nameProduct: item.product.nameProduct,
        price: item.product.price,
      })
    );
  };
  const { data, loading, error } = useQuery(GetUserCart);
  const Nav = useNavigate();
  if (loading) return <p>جاري التحميل...</p>;
  if (error) return <p>حدث خطأ: {error.message}</p>;

  return (
    <div className="flex flex-col">
      <div
        className="  flex 
          bg-[white] font-[22px] w-[100%] h-[58px] pl-[11px] gap-[2%] items-center content-center flex-wrap "
      >
        <div id="left" className="flex w-[44%] gap-[4%] items-baseline ">
          <LogoComponet></LogoComponet>
        </div>

        <div
          id="right"
          className="flex w-[50%] gap-[5%] h-[100%] pr-[30px] justify-end "
        >
          <Profilthngs></Profilthngs>
        </div>
      </div>
      <Sonedbar></Sonedbar>
      <div className="flex flex-row">
        <div
          id="products"
          className="w-[100%] h-[83.6vh] overflow-auto text-blue-500 flex flex-wrap gap-[16px]"
        >
          {data.getCartUser.map((item: CartUserData) => (
            <Card key={item.cartid} className="w-[30%]">
              <CardHeader
                avatar={
                  <Avatar
                    src={item.product.productThing.imageURL}
                    sx={{ width: 77, height: 77 }}
                  ></Avatar>
                }
                title={
                  <Box>
                    <Typography sx={{ fontFamily: "Oswald" }}>
                      Name:
                      <span
                        className="font-[math]"
                        style={{
                          fontSize: "15px",
                          color: "cadetblue",
                        }}
                      >
                        {item.product.nameProduct}
                      </span>
                    </Typography>
                    <Typography sx={{ fontFamily: "Oswald" }}>
                      description:
                      <span
                        className="font-[math]"
                        style={{
                          fontSize: "15px",
                          color: "cadetblue",
                        }}
                      >
                        {item.product.description}
                      </span>
                    </Typography>
                    <Typography sx={{ fontFamily: "Oswald" }}>
                      price:{" "}
                      <span
                        className="font-[math]"
                        style={{
                          fontSize: "15px",
                          color: "cadetblue",
                        }}
                      >
                        {item.product.price}
                      </span>
                    </Typography>
                    <Typography sx={{ fontFamily: "Oswald" }}>
                      brand:
                      <span
                        className="font-[math]"
                        style={{
                          fontSize: "15px",
                          color: "cadetblue",
                        }}
                      >
                        {item.product.productDetails.brand}
                      </span>
                    </Typography>

                    <Typography sx={{ fontFamily: "Oswald" }}>
                      Characteristics
                    </Typography>
                    {item.product.attributeValues.map((iteamatt) => (
                      <div
                        key={iteamatt.categoryAttribute.key}
                        className="flex flex-row flex-wrap items-baseline gap-[3%] "
                      >
                        <Typography sx={{ fontFamily: "Oswald" }}>
                          {iteamatt.categoryAttribute.key}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "math",
                            fontSize: "15px",
                            color: "cadetblue",
                          }}
                        >
                          {iteamatt.value}
                        </Typography>
                      </div>
                    ))}
                  </Box>
                }
              />
              <Button
                key={item.productid}
                variant="contained"
                onClick={(e) => {
                  e.preventDefault();
                  Cartinsert(
                    injectionCartItem({
                      idProduct: item.productid,
                      nameProduct: item.product.nameProduct,
                      price: item.product.price,
                    })
                  );
                  window.alert("add to buy process");
                }}
              >
                Click to insert product in Buy process
              </Button>
              <Button
                key={item.productid + 1}
                variant="contained"
                onClick={(e) => {
                  e.preventDefault();
                  Cartinsert(
                    Delateallaftrbuybeforebu({
                      idProduct: item.productid,
                      nameProduct: item.product.nameProduct,
                      price: item.product.price,
                    })
                  );
                  window.alert("DelateItem form Buy process");
                }}
              >
                DelateItem form Buy process
              </Button>
            </Card>
          ))}
        </div>
      </div>
      <PayPalButton></PayPalButton>
    </div>
  );
}
