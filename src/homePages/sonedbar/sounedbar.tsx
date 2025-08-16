import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import Function from "../barfunctuons/basicFunction";
import Button from "@mui/material/Button";
export default function Sonedbar() {
  const Navigate = useNavigate();
  return (
    <div
      className=" flex flex-row h-[6%] bg-[#303150] w-[100%] oswald-medium text-[aliceblue] gap-[10px]
      "
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px",
        fontSize: "18px",
      }}
    >
      <DropdownMenu.Root key={"function"}>
        <DropdownMenu.Trigger asChild>
          <button
            className="hover:bg-[cadetblue] transition-all duration-400"
            style={{
              borderRadius: "3px",
            }}
          >
            Functons
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content
          side="bottom"
          align="start"
          sideOffset={5}
          className="text-[red] "
        >
          <DropdownMenu.Item>
            <Link
              component={RouterLink}
              to="/home/Cpmpare"
              color="aliceblue"
              underline="none"
            >
              P-comparison
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Arrow></DropdownMenu.Arrow>
          <DropdownMenu.Item>
            <Link
              component={RouterLink}
              to="/home/Chatbot"
              color="aliceblue"
              underline="none"
            >
              CahtBoot
            </Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <DropdownMenu.Root key={"Catgroy"}>
        <DropdownMenu.Trigger asChild>
          <button
            className="hover:bg-[cadetblue] transition-all duration-400"
            style={{
              borderRadius: "3px",
            }}
          >
            Catgroy
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content
          side="bottom"
          align="start" // تبدأ من أسفل الزر
          sideOffset={5}
          className="text-[red]"
        >
          <DropdownMenu.Item>Pc</DropdownMenu.Item>
          <DropdownMenu.Item>PC Componet</DropdownMenu.Item>
          <DropdownMenu.Item>LAPTOP</DropdownMenu.Item>

          <DropdownMenu.Item>Clothes</DropdownMenu.Item>
          <DropdownMenu.Item>Book</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}
