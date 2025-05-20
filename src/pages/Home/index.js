import React, { useState, useEffect } from "react";
import { PageArea, SearchArea, CategoryGrid } from './styled';
import useApi from '../../helpers/MvxApi';
import { PageContainer } from '../../components/MainComponents';
import { Link } from 'react-router-dom';
import AdItem from "../../components/partials/AdItem";

const iconMap = {
  carros: '/img/car.png',
  imoveis: '/img/home.png',
  moveis: '/img/furniture.png',
  fashion: '/img/fashion.png',
  esportes: '/img/sports.png',
};

const Page = () => {
  const api = useApi();
  const [stateList, setStateList] = useState([]);
  const [categories, setCategories] = useState([]);
  const[adList, setAdList] = useState([]);

  useEffect(() => {
    const getStates = async () => {
      const slist = await api.getStates();
      setStateList(slist);
    };
    getStates();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      const cats = await api.getCategories();
      setCategories(cats);
    };
    getCategories();
  }, []);

   useEffect(() => {
    const getRecentAds = async () => {
      const json = await api.getAds({
        sort:'desc',
        limit:8,
      });

      setAdList(json.ads);
    };
    getRecentAds();
  }, []);

  return (
    <>
      <SearchArea>
        <PageContainer>
          <div className="searchBox">
            <form method="GET" action="/ads">
              <input type="text" name="q" placeholder="O que você procura?" />
              <select name="state" defaultValue="">
                <option value="" disabled>Selecione o estado</option>
                {stateList.map((i) => (
                  <option key={i.name} value={i.name}>{i.name}</option>
                ))}
              </select>
              <button type="submit">Pesquisar</button>
            </form>
          </div>

          <CategoryGrid>
            {categories.map((cat) => {
              const iconSrc = iconMap[cat.slug];
              return (
                <Link key={cat.slug} to={`/ads?cat=${cat.slug}`} className="categoryItem">
                  <span>{cat.name}</span>
                </Link>
              );
            })}
          </CategoryGrid>
        </PageContainer>
      </SearchArea>

      <PageContainer>
        <PageArea>
          <h2> Anúncios Recentes</h2>
          <div className="list">
            {adList.map((i,k)=>
              <AdItem key={k} data={i} />
            )}
          </div>
          <Link to='/ads' className="seeAllLink">Ver todos</Link>
          <hr/>

          texto teste, mudar depois
        </PageArea>
      </PageContainer>
    </>
  );
};

export default Page;
