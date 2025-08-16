import { gql, useQuery } from "@apollo/client";
import type { WishlistItem } from "./schemawlslist";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import LogoComponet from "../homePages/TopPar/subcompnet/logo";
import Profilthngs from "../homePages/TopPar/subcompnet/profileavftar";
import Sonedbar from "../homePages/sonedbar/sounedbar";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  Avatar,
} from "@mui/material";
import axios from "axios";
import { delateitem, injectonWishlst } from "../SateRedux/slice/wishlstuser";
import { number } from "zod";
import { m } from "framer-motion";
import { Link } from "react-router-dom";

const gqlQuaryWshlstUser = gql`
  query {
    userWisglst {
      id
      userId
      productid
      product {
        nameProduct
        description
        price
        productThing {
          imageURL
        }
        productDetails {
          brand
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

const WishlistPage = () => {
  const useWishdis = useDispatch();

  const { data, loading, error } = useQuery(gqlQuaryWshlstUser);

  if (loading) return <p>جاري التحميل...</p>;
  if (error) return <p>حدث خطأ: {error.message}</p>;

  if (!data?.userWisglst) {
    return null;
  }

  return (
    <>
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
      <div
        id="contner"
        className="grid grid-cols-4 gap-4 p-[6px] h-[100vh] p-[20px] content-baseline
"
      >
        {data.userWisglst.map((item: WishlistItem) => (
          <Link
            to={`/home/ProductPage/${item.productid}`}
            key={item.id}
            style={{
              textDecoration: "none",
            }}
          >
            <Card className="h-[180px]">
              <CardHeader
                avatar={
                  <Avatar
                    src={item.product.productThing.imageURL}
                    sx={{ width: 56, height: 56 }}
                  />
                }
                title={item.product.nameProduct}
                slotProps={{
                  title: {
                    sx: { fontFamily: "Oswald", textDecoration: "none" },
                  },
                }}
              />
              <CardActions>
                <Button
                  size="small"
                  onClick={(re) => {
                    re.preventDefault();
                    axios
                      .delete(
                        "http://localhost:8087/api/WishListBascOP/DelateOneobkect",
                        {
                          withCredentials: true,
                          params: {
                            IdWishitem: item.id,
                          },
                        }
                      )
                      .then((reso) => {
                        window.alert(reso.data);
                        useWishdis(delateitem(item));
                      })
                      .catch((err) => {
                        window.alert(err);
                      });
                  }}
                >
                  Dealte
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    axios
                      .post(
                        "http://localhost:8087/api/Cart/addTOCart",
                        {
                          idprouct: item.productid,
                        },
                        {
                          withCredentials: true,
                        }
                      )
                      .then((reso) => {
                        window.alert(reso.data);
                      })
                      .catch((r) => {
                        window.alert(r.message || r);
                      });
                  }}
                  variant="contained"
                >
                  ToCart
                </Button>
              </CardActions>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export default WishlistPage;
