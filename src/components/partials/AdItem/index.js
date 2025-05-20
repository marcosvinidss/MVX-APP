import React from "react";
import { Item } from "./styled";
import { Link } from "react-router-dom";

const BASEAPI = "http://localhost:5000";

export default function AdItem({ data }) {
  const placeholderUrl = "https://dummyimage.com/150x150/cccccc/000000.png&text=Sem+Imagem";

  const imageUrl = data?.image
    ? (data.image.startsWith('http') ? data.image : `${BASEAPI}/media/${data.image}`)
    : placeholderUrl;

  console.log("Image URL usada em AdItem:", imageUrl);

  return (
    <Item>
      <Link to={`/ad/${data.id}`}>
        <div
          className="itemImage"
          style={{ width: "150px", height: "150px", overflow: "hidden" }}
        >
          <img
            src={imageUrl}
            alt={data.title || "Imagem do anúncio"}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => {
              e.currentTarget.src = placeholderUrl;
            }}
          />
        </div>
        <div className="itemName">{data.title || "Sem título"}</div>
        <div className="itemPrice">
          {data.priceNegotiable
            ? "Preço Negociável"
            : data.price
            ? `R$ ${data.price}`
            : "Sem preço"}
        </div>
      </Link>
    </Item>
  );
}
