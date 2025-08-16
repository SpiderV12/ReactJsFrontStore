import LogoComponet from "./subcompnet/logo";
import Search from "./subcompnet/search";
import Profilthngs from "./subcompnet/profileavftar";
export default function TopBarComponet() {
  return (
    <div
      className="  flex 
    bg-[white] font-[22px] w-[100%] h-[10%] pl-[11px] gap-[2%] items-center content-center flex-wrap "
    >
      <div id="left" className="flex w-[44%] gap-[4%] items-baseline ">
        <LogoComponet></LogoComponet>
        <Search></Search>
      </div>

      <div
        id="right"
        className="flex w-[50%] gap-[5%] h-[100%] pr-[30px] justify-end "
      >
        <Profilthngs></Profilthngs>
      </div>
    </div>
  );
}
