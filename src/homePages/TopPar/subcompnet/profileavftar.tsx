import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";
export default function Profilthngs() {
  return (
    <div className="flex  oswald-medium">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            className="text-[#303150]    oswald-medium  text-[17px]  
"
          >
            Account
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="z-[6]">
          <DropdownMenu.Group
            className="bg-[lightblue] w-[400px] rounded-l p-[15px] flex flex-col gap-[10px]

"
          >
            <div
              id="log Snng"
              className=" flex flex-col jcontent-center  items-center flex-wrap "
            >
              <DropdownMenu.Item className="oswald-medium text-[#303150]   text-[17px] insdeAccountdeop">
                <Link to={"/login"}>Login</Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item className="oswald-medium">
                <Link
                  to={"/Singin"}
                  className="text-cyan-600  underline underline-offset-4 text-[16px] w-[100%]
                   border-b-[3px] border-solid border-sky-900"
                >
                  If you do not have an account create account from here
                </Link>
              </DropdownMenu.Item>
            </div>
            <div
              id="contner "
              className="flex flex-row text-[16px] gap-[10px] "
            >
              <div
                id="left"
                className="flex flex-col  w-[50%] flex-wrap content-center gap-[5px] border-r-[3px] border-solid border-sky-900"
              >
                <DropdownMenu.Item className="oswald-medium insdeAccountdeop text-[#303150]">
                  <Link to={"/home/Account/profile"}>Profile</Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item className="oswald-medium insdeAccountdeop">
                  <Link to={"/home/Account/Cart"}>Cart</Link>
                </DropdownMenu.Item>
              </div>
              <div
                id="right"
                className="flex flex-col w-[50%] flex-wrap content-center gap-[5px]"
              >
                <DropdownMenu.Item className="oswald-medium insdeAccountdeop">
                  <Link to={"/home/Account/Wishlist"}>WishLst</Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item className="oswald-medium insdeAccountdeop">
                  <Link to={"/home/Account/Favorites"}>Favorites</Link>
                </DropdownMenu.Item>
              </div>
            </div>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}
