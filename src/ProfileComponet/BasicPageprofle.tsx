import { Link } from "react-router-dom";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AddCardIcon from "@mui/icons-material/AddCard";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import ReceiptIcon from "@mui/icons-material/Receipt";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Sonedbar from "../homePages/sonedbar/sounedbar";
import LogoComponet from "../homePages/TopPar/subcompnet/logo";
import Profilthngs from "../homePages/TopPar/subcompnet/profileavftar";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CardHeader,
  Avatar,
} from "@mui/material";

export default function Homeprofile() {
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
      <div className="h-[100vh] w-full flex flex-wrap gap-[25px] justify-left content-baseline p-[24px]">
        <Link
          to={"/home/Account/profile/ManagementAccount"}
          className="w-[175px] "
          style={{
            textDecoration: "none",
          }}
        >
          <Card>
            <CardHeader
              sx={{ flexDirection: "row", height: "fit-content" }}
              avatar={<ManageAccountsIcon sx={{ fontSize: 47 }} />}
              title="Management Account"
              slotProps={{
                title: {
                  sx: { fontFamily: "Oswald", textDecoration: "none" },
                },
              }}
            />
          </Card>
        </Link>

        <Link
          to={"/home/Account/profile/Suggestions"}
          className="w-[175px] "
          style={{
            textDecoration: "none",
          }}
        >
          <Card>
            <CardHeader
              sx={{ flexDirection: "row", height: "fit-content" }}
              avatar={<LightbulbIcon sx={{ fontSize: 47 }} />}
              title="Make Suggestions"
              slotProps={{
                title: {
                  sx: { fontFamily: "Oswald" },
                },
              }}
            />
          </Card>
        </Link>
      </div>
    </div>
  );
}
