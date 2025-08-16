import Sonedbar from "../../homePages/sonedbar/sounedbar";
import Profilthngs from "../../homePages/TopPar/subcompnet/profileavftar";
import LogoComponet from "../../homePages/TopPar/subcompnet/logo";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Avatar,
} from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import axios from "axios";
export default function IdeaGive() {
  const [productsugg, Setproductsugg] = useState({
    name: "",
    Brand: "",
  });
  const [ideauser, Setideauser] = useState({
    TextOFIdea: "",
  });
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
      <div>
        <Card className="h-[100%]">
          <CardHeader
            avatar={
              <Avatar>
                <LightbulbIcon sx={{ fontSize: 24 }} />
              </Avatar>
            }
          />
          <CardContent>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "25px",
              }}
            >
              <div className="flex flex-col gap-[15px]">
                <Typography
                  sx={{
                    fontFamily: "Oswald",
                    fontSize: "17px",
                  }}
                >
                  Send name products you would like to see available in the
                  store.
                </Typography>
                <TextField
                  id="outlined-basic"
                  label="idea"
                  multiline
                  minRows={3}
                  maxRows={8}
                  variant="outlined"
                  sx={{ "& .MuiInputBase-root": { height: 66 } }}
                  onChange={(e) => {
                    Setideauser({ ...ideauser, TextOFIdea: e.target.value });
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    height: "30px",
                    width: "fit-content",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    axios
                      .post(
                        "http://localhost:8087/api/ProfileSuggestion/AddUsersIdea",
                        ideauser,
                        {
                          withCredentials: true,
                        }
                      )
                      .then((re) => {
                        window.alert(re);
                      })
                      .catch((e) => {
                        window.alert(e);
                      });
                  }}
                >
                  Sumbit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="h-[100%]">
          <CardHeader
            avatar={
              <Avatar>
                <LightbulbIcon sx={{ fontSize: 24 }} />
              </Avatar>
            }
          />
          <CardContent>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "25px",
              }}
            >
              <div className="flex flex-col gap-[15px]">
                <Typography
                  sx={{
                    fontFamily: "Oswald",
                    fontSize: "17px",
                  }}
                >
                  Send your ideas for improving the store and
                </Typography>
                <TextField
                  id="outlined-basic"
                  label="Name product"
                  multiline
                  minRows={2}
                  maxRows={3}
                  variant="outlined"
                  sx={{ "& .MuiInputBase-root": { height: 45 } }}
                  onChange={(e) => {
                    Setproductsugg({ ...productsugg, name: e.target.value });
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Brand product"
                  variant="outlined"
                  sx={{ "& .MuiInputBase-root": { height: 45 } }}
                  onChange={(e) => {
                    Setproductsugg({ ...productsugg, Brand: e.target.value });
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    height: "30px",
                    width: "fit-content",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    axios
                      .post(
                        "http://localhost:8087/api/ProfileSuggestion/AddProductSugg",
                        productsugg,
                        {
                          withCredentials: true,
                        }
                      )
                      .then((re) => {
                        window.alert(re);
                      })
                      .catch((e) => {
                        window.alert(e);
                      });
                  }}
                >
                  Sumbit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
