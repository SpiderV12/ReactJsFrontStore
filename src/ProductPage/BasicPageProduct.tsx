import LogoComponet from "../homePages/TopPar/subcompnet/logo";
import Profilthngs from "../homePages/TopPar/subcompnet/profileavftar";
import Sonedbar from "../homePages/sonedbar/sounedbar";
import type { ProductPageitem } from "./ModelProductget";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { useParams } from "react-router-dom";
import { number } from "zod";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";
const TheProduct = gql`
  query GetProduct($id: Int!) {
    gettheproduct(id: $id) {
      nameProduct
      description
      price
      count
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
`;
export default function PageProucdt() {
  const { idproduct } = useParams();
  const idNumber = Number(idproduct);
  let conting = 1;
  console.log(idNumber);
  const { loading, error, data } = useQuery(TheProduct, {
    variables: { id: idNumber },
  });
  if (loading) return <p>جار التحميل...</p>;
  if (error) return <p>حدث خطأ: {error.message}</p>;
  console.log(data);
  const Product: ProductPageitem = data.gettheproduct;

  console.log("SD:", Product);
  return (
    <div className="flex flex-col h-auto ">
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
      <div id="Contner" className="w-[100%] h-[76vh] bg-[snow] flex ">
        <div
          id="LeftImage"
          className="w-[50%] h-[82vh]  bg-[azure]  flex items-center justify-center"
        >
          <img
            style={{ width: "200px", height: "299px" }}
            src={Product.productThing.imageURL}
            sizes="44px"
            className="max-w-[200px]  "
          ></img>
        </div>

        <div id="RighInfoofproduct" className="w-[50%] h-[76vh] ">
          <Card>
            <CardContent>
              <Box
                sx={{
                  height: "76vh",
                  display: "flex",
                  flexDirection: "column",
                  gap: "21px",
                  padding: "16px",
                }}
              >
                <div id="State" className="flex flex-col gap-[4%]">
                  <Typography
                    component={"h4"}
                    sx={{
                      fontSize: "17px",
                      fontFamily: "Oswald",
                    }}
                  >
                    state
                  </Typography>
                  <Typography
                    component={"h6"}
                    sx={{
                      fontSize: "16px",
                      fontFamily: "fangsong",
                    }}
                  >
                    {Product.count > 0 ? "In stock" : "Out stock"}
                  </Typography>
                </div>

                <div id="NameProduct">
                  <Typography
                    component={"h5"}
                    sx={{
                      fontSize: "17px",
                      fontFamily: "Oswald",
                    }}
                  >
                    Name
                  </Typography>
                  <Typography
                    component={"h6"}
                    sx={{
                      fontSize: "16px",
                      fontFamily: "fangsong",
                    }}
                  >
                    {Product.nameProduct}
                  </Typography>
                </div>

                <div id="description">
                  <Typography
                    component={"h5"}
                    sx={{
                      fontSize: "17px",
                      fontFamily: "Oswald",
                    }}
                  >
                    description
                  </Typography>
                  <Typography
                    component={"h6"}
                    sx={{
                      fontSize: "16px",
                      fontFamily: "fangsong",
                    }}
                  >
                    {Product.description}
                  </Typography>
                </div>

                <div id="Price">
                  <Typography
                    component={"h5"}
                    sx={{
                      fontSize: "17px",
                      fontFamily: "Oswald",
                    }}
                  >
                    price
                  </Typography>
                  <Typography
                    component={"h6"}
                    sx={{
                      fontSize: "16px",
                      fontFamily: "fangsong",
                    }}
                  >
                    {Product.price}
                  </Typography>
                </div>
                <div id="Brand">
                  <Typography
                    component={"h5"}
                    sx={{
                      fontSize: "17px",
                      fontFamily: "Oswald",
                    }}
                  >
                    brand
                  </Typography>
                  <Typography
                    component={"h6"}
                    sx={{
                      fontSize: "16px",
                      fontFamily: "fangsong",
                    }}
                  >
                    {Product.productDetails.brand}
                  </Typography>
                </div>
                <Typography
                  component={"h5"}
                  sx={{
                    fontSize: "17px",
                    fontFamily: "Oswald",
                  }}
                >
                  Characteristics
                </Typography>
                <div id="CointinerCharacteristics" className="flex gap-[2%]">
                  {Product.attributeValues.map((v, i) => (
                    <div>
                      <span className="text-[15px] oswald-medium ">
                        {v.categoryAttribute.key}
                      </span>
                      <span className="text-[14px] font-[fangsong]">
                        :{v.value}
                      </span>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={(e) => {
                    axios
                      .post(
                        "http://localhost:8087/api/Cart/addTOCart",
                        {
                          idprouct: idNumber,
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
              </Box>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
