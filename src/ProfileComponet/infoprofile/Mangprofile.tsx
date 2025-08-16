import LogoComponet from "../../homePages/TopPar/subcompnet/logo";
import Profilthngs from "../../homePages/TopPar/subcompnet/profileavftar";
import Sonedbar from "../../homePages/sonedbar/sounedbar";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import { useEffect } from "react";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import type { Userinf } from "./Shemarspon";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CardHeader,
  Avatar,
} from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import axios from "axios";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
const gqlQuaryUserinfo = gql`
  query {
    getALLnfo {
      id
      userName
      email
      emailConfirmed
      twoFactorEnabled
      phoneNumber
      phoneNumberConfirmed
      userDatil {
        age
        country
      }
    }
  }
`;

export default function ProfleMang() {
  const [address, Setaddress] = useState({
    AddressLine1: "",
    City: "",
    State: "",
    Phone: "",
    Country: "",
    PostalCode: "",
  });
  const { data, loading, error } = useQuery(gqlQuaryUserinfo);
  const [pass, setPass] = useState({ newpass: "" });
  const [Email, setEmail] = useState({ oldone: "", newEmail: "" });

  if (loading) return <p>جاري التحميل...</p>;
  if (error) return <p>حدث خطأ: {error.message}</p>;
  const userinfo: Userinf = data.getALLnfo;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;
  const EmailRegex = /^.*@gmail\.com$/;

  return (
    <div>
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

      <div id="Coniner" className="h-[83vh] w-[100%] flex gap-[1%] ">
        <div id=" Continerinfo" className="w-[50%]">
          <Card className="h-[100%]">
            <CardHeader
              avatar={
                <Avatar>
                  <SwitchAccountIcon sx={{ fontSize: 24 }} />
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
                <div className="flex flex-col gap-[6px]">
                  <Typography
                    sx={{
                      fontFamily: "Oswald",
                      fontSize: "17px",
                    }}
                  >
                    Username
                  </Typography>

                  <Typography
                    sx={{
                      fontFamily: "serif",
                      fontSize: "17px",
                    }}
                  >
                    {userinfo.userName}
                  </Typography>
                </div>

                <div className="flex flex-col gap-[6px]">
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Oswald",
                      fontSize: "17px",
                    }}
                  >
                    Email
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "serif",
                      fontSize: "17px",
                    }}
                  >
                    {userinfo.email}
                  </Typography>
                </div>
                <div className="flex flex-col gap-[6px]">
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Oswald",
                      fontSize: "17px",
                    }}
                  >
                    Age
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "serif",
                      fontSize: "17px",
                    }}
                  >
                    {userinfo.userDatil.age}{" "}
                  </Typography>
                </div>
                <div className="flex flex-col gap-[6px]">
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Oswald",
                      fontSize: "17px",
                    }}
                  >
                    {" "}
                    Country
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "serif",
                      fontSize: "17px",
                    }}
                  >
                    {userinfo.userDatil.country}
                  </Typography>
                </div>
                <div className="flex flex-col gap-[6px]">
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Oswald",
                      fontSize: "17px",
                    }}
                  >
                    {" "}
                    2FA
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "serif",
                      fontSize: "17px",
                    }}
                  >
                    {userinfo.twoFactorEnabled ? "Enabled" : "Disabled"}
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div id="Action" className="w-[50%] ">
          <Card className="h-[100%]  max-h-[700حء] overflow-y-auto">
            <CardHeader
              avatar={
                <Avatar>
                  <ManageAccountsIcon sx={{ fontSize: 24 }} />
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
                    Make New Password
                  </Typography>
                  <TextField
                    id="outlined-basic"
                    label="New password"
                    variant="outlined"
                    sx={{ "& .MuiInputBase-root": { height: 45 } }}
                    onChange={(e) =>
                      setPass({ ...pass, newpass: e.target.value })
                    }
                  />
                  <Button
                    variant="contained"
                    sx={{
                      height: "30px",
                      width: "fit-content",
                    }}
                    onClick={(e) => {
                      if (passwordRegex.test(pass.newpass)) {
                        axios
                          .post(
                            "http://localhost:8087/api/Profile/ChangePaaword",
                            pass,
                            {
                              withCredentials: true,
                            }
                          )
                          .then((resonse) => {
                            window.alert(resonse.data);
                          })
                          .catch((er) => {
                            window.alert(er);
                          });
                      } else {
                        window.alert(
                          "Password need hava at lest one smal and large char and at lest one of @$!%*?& and one number "
                        );
                      }
                    }}
                  >
                    Sumbit
                  </Button>
                </div>
                <div className="flex flex-col gap-[15px]">
                  <Typography
                    sx={{
                      fontFamily: "Oswald",
                      fontSize: "17px",
                    }}
                  >
                    Make new Email
                  </Typography>
                  <TextField
                    id="outlined-basic"
                    label="New Email"
                    variant="outlined"
                    sx={{ "& .MuiInputBase-root": { height: 45 } }}
                    onChange={(e) =>
                      setEmail({
                        ...Email,
                        newEmail: e.target.value,
                        oldone: userinfo.email,
                      })
                    }
                  />
                  <Button
                    variant="contained"
                    sx={{
                      height: "30px",
                      width: "fit-content",
                    }}
                    onClick={(e) => {
                      if (EmailRegex.test(Email.newEmail)) {
                        axios
                          .post(
                            "http://localhost:8087/api/Profile/ChangeEmail",
                            Email,
                            {
                              withCredentials: true,
                            }
                          )
                          .then((resonse) => {
                            window.alert(resonse.data);
                          })
                          .catch((er) => {
                            window.alert("erro" + er);
                          });
                      } else {
                        window.alert("need end with @gamil.co");
                      }
                    }}
                  >
                    Sumbit
                  </Button>
                </div>

                <div className="flex flex-col gap-[15px] " id="Address">
                  <Typography
                    sx={{
                      fontFamily: "Oswald",
                      fontSize: "17px",
                    }}
                  >
                    Make new Address
                  </Typography>
                  <TextField
                    id="outlined-basic"
                    label="AddressLine1"
                    variant="outlined"
                    sx={{ "& .MuiInputBase-root": { height: 45 } }}
                    value={address.AddressLine1}
                    onChange={(e) => {
                      Setaddress({ ...address, AddressLine1: e.target.value });
                    }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="City"
                    variant="outlined"
                    sx={{ "& .MuiInputBase-root": { height: 45 } }}
                    value={address.City}
                    onChange={(e) => {
                      Setaddress({ ...address, City: e.target.value });
                    }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="State"
                    variant="outlined"
                    sx={{ "& .MuiInputBase-root": { height: 45 } }}
                    value={address.State}
                    onChange={(e) => {
                      Setaddress({ ...address, State: e.target.value });
                    }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Phone"
                    slotProps={{
                      input: {
                        readOnly: true,
                      },
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    value={userinfo.phoneNumber}
                    variant="outlined"
                    sx={{ "& .MuiInputBase-root": { height: 45 } }}
                    onChange={(e) => {
                      Setaddress({ ...address, Phone: e.target.value });
                    }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Country"
                    slotProps={{
                      input: {
                        readOnly: true,
                      },
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    value={userinfo.userDatil.country}
                    variant="outlined"
                    sx={{ "& .MuiInputBase-root": { height: 45 } }}
                    onChange={(e) => {
                      Setaddress({ ...address, Country: e.target.value });
                    }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="PostalCode"
                    variant="outlined"
                    sx={{ "& .MuiInputBase-root": { height: 45 } }}
                    value={address.PostalCode}
                    onChange={(e) => {
                      Setaddress({ ...address, PostalCode: e.target.value });
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
                          "http://localhost:8087/api/Profile/Makeaddress",
                          address,
                          {
                            withCredentials: true,
                          }
                        )
                        .then((response) => {
                          window.alert(response.data);
                        })
                        .catch((error) => {
                          window.alert(error);
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
      </div>
    </div>
  );
}
