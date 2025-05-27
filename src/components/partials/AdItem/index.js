import React from "react";
import { Item } from "./styled";
import { Link } from "react-router-dom";

export default (props) => {
  const ad = props.data;

  return (
    <Item className="aditem">
      <Link to={`/ad/${ad.id}`}>
        <div className="itemImage">
          <img
            src={ad.image || `${process.env.REACT_APP_BASE}/media/default.jpg`}
            alt={`Imagem do anúncio ${ad.title}`}
          />
        </div>
        <div className="itemInfo">
          <div className="itemName">{ad.title}</div>
          <div className="itemPrice">
            {ad.priceNegotiable ? "Preço negociável" : `R$ ${ad.price.toFixed(2)}`}
          </div>
        </div>
      </Link>
    </Item>
  );
};
