import Link from "@mui/material/Link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Link as RouterLink } from "react-router-dom";
export default function Function() {
  return (
    <div className="flex gap-[3%] oswald-medium text-[18px] bg-[#303150] text-[snow]  shadow-xl/10 ">
      <div id="basix" className="text-center  w-[20%]">
        <h4>Functions</h4>
      </div>
      <nav className="flex flex-row gap-[%] ">
        <Link
          component={RouterLink}
          to="/home/Cpmpare"
          color="aliceblue"
          underline="none"
        >
          Product comparison
        </Link>
        <Link
          component={RouterLink}
          to="/home/Chatbot"
          color="aliceblue"
          underline="none"
        >
          CahtBoot
        </Link>
      </nav>
    </div>
  );
}
