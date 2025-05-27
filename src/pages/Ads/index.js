import React, { useState, useEffect } from "react";
import { PageArea } from './styled';
import useApi from '../../helpers/MvxApi';
import { PageContainer } from '../../components/MainComponents';
import { useLocation, useNavigate } from 'react-router-dom';
import AdItem from "../../components/partials/AdItem";

const Page = () => {
  const api = useApi();
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);

  const [q, setQ] = useState(query.get('q') || '');
  const [cat, setCat] = useState(query.get('cat') || '');
  const [state, setState] = useState(query.get('state') || '');

  const [stateList, setStateList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [adList, setAdList] = useState([]);

  useEffect(() => {
    const queryParams = [];

    if (q) queryParams.push(`q=${encodeURIComponent(q)}`);
    if (cat) queryParams.push(`cat=${encodeURIComponent(cat)}`);
    if (state) queryParams.push(`state=${encodeURIComponent(state)}`);

    navigate(`?${queryParams.join('&')}`, { replace: true });
  }, [q, cat, state, navigate]);

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
        sort: 'desc',
        limit: 8,
        q,
        cat,
        state,
      });
      setAdList(json.ads);
    };
    getRecentAds();
  }, [q, cat, state]);

  return (
    <PageContainer>
      <PageArea>
        <div className="leftSide">
          <form method="GET">
            <input
              type="text"
              name="q"
              placeholder="O que você procura?"
              value={q}
              onChange={e => setQ(e.target.value)}
            />

            <div className="filterName">Estado</div>
            <select name="state" value={state} onChange={e => setState(e.target.value)}>
              <option value="">Selecione um estado</option>
              {stateList.map((i, k) => (
                <option key={k} value={i.name}>{i.name}</option>
              ))}
            </select>

            <div className="filterName">Categoria</div>
            <ul>
              {categories.map((i, k) => (
                <li
                  key={k}
                  className={`categoryItem${cat === i.slug ? ' active' : ''}`}
                  onClick={() => setCat(i.slug)}
                >
                  <span>{i.name}</span>
                </li>
              ))}
            </ul>
          </form>
        </div>
        <div className="rightSide">
          {adList.length > 0 && adList.map((ad, index) => (
            <AdItem key={index} data={ad} />
          ))}
        </div>
      </PageArea>
    </PageContainer>
  );
};

export default Page;
