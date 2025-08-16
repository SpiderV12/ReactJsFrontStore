import { useSearchBox, useConnector } from "react-instantsearch";
import { connectHits } from "instantsearch.js/es/connectors";
import { Link } from "react-router-dom";
interface attr {
  Key: string;
  Value: string;
}
interface Hit {
  objectID: string;
  NameProduct: string;
  IdProduct: number;
}

export default function CustomHits() {
  const { query } = useSearchBox();

  // مرر كائن فارغ وليس دالة
  const connectorState = useConnector(connectHits, {});
  const hits = (connectorState?.hits as Hit[]) || [];

  if (!query.trim()) return null;

  return (
    <ul className="bg-white ">
      {hits.map((hit) => (
        <li
          key={hit.objectID}
          className="text-left
 hover:bg-gray-100"
        >
          <Link to={`/home/ProductPage/${hit.IdProduct}`}>
            {hit.NameProduct}
          </Link>
        </li>
      ))}
    </ul>
  );
}
