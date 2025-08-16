import { useParams } from "react-router-dom";
import LogoComponet from "../homePages/TopPar/subcompnet/logo";
import Sonedbar from "../homePages/sonedbar/sounedbar";
import Profilthngs from "../homePages/TopPar/subcompnet/profileavftar";
export default function ChoseAddr() {
  const { idUser } = useParams();
  console.log(idUser);

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
      <div className="flex flex-row"></div>
    </div>
  );
}
