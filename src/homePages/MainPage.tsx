import Lodinganimatio from "../lotteAnm/loadhinganimatio";
import TopBarComponet from "./TopPar/TopBarCompnet";
import BasicFuncton from "./barfunctuons/basicFunction";
import BodyProduct from "./body/BodyComponet";
import Sonedbar from "./sonedbar/sounedbar";
export default function Home() {
  return (
    <div className="h-[100vh] ">
      <TopBarComponet></TopBarComponet>
      <Sonedbar></Sonedbar>
      <BodyProduct></BodyProduct>
    </div>
  );
}
