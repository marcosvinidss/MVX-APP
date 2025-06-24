import React, { useEffect, useState } from "react";
import { PageArea, PageContainer, Fake } from './styled';
import useApi from '../../helpers/MvxApi';
import { useParams } from "react-router-dom";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const Page = () => {
  const api = useApi();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [adInfo, setAdInfo] = useState({});

  useEffect(() => {
    const getAdInfo = async (id) => {
      const json = await api.getAd(id, true);
      setAdInfo(json);
      setLoading(false);
    };
    getAdInfo(id);
  }, [id]);

  const formatDate = (date) => {
    const cDate = new Date(date);
    const months = [
      "Janeiro", "Fevereiro", "Março", "Abril",
      "Maio", "Junho", "Julho", "Agosto",
      "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    const cDay = cDate.getDate();
    const cMonth = cDate.getMonth();
    const cYear = cDate.getFullYear();
    return `${cDay} de ${months[cMonth]} de ${cYear}`;
  };

  return (
    <PageContainer>
      <PageArea>
        <div className="leftSide">
          <div className="box">
            <div className="adImage">
              {loading && <Fake height={300} />}
              {!loading && adInfo.images && adInfo.images.length > 0 && (
                <Slide easing="ease" indicators autoplay={true} duration={3000}>
                  {adInfo.images.map((img, index) => (
                    <div key={index} className="each-slide">
                      <img
                        src={img}
                        alt={`slide-${index}`}
                        style={{ width: '100%', borderRadius: '6px', height: 'auto', objectFit: 'cover' }}
                      />
                    </div>
                  ))}
                </Slide>
              )}
            </div>

            <div className="adInfo">
              <div className="adName">
                {loading && <Fake height={20} />}
                {adInfo.title && <h2>{adInfo.title}</h2>}
                {adInfo.dateCreated && (
                  <small>Criado em {formatDate(adInfo.dateCreated)}</small>
                )}
              </div>

              <div className="adDescription">
                {loading && <Fake height={100} />}
                {adInfo.description && <p>{adInfo.description}</p>}
                {!loading && adInfo.views >= 0 && (
                  <p style={{ marginTop: '10px', color: '#888' }}>
                    {adInfo.views} visualizações
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="rightSide">
          {loading && <Fake height={100} />}
          {!loading && (
            <>
              <div className="priceBox">
                {adInfo.priceNegotiable ? (
                  <div className="negotiable">Preço Negociável</div>
                ) : (
                  <div className="price">R$ {adInfo.price}</div>
                )}
              </div>

              <div className="contactBox">
                {adInfo.userInfo && (
                  <>
                    <div className="createdBy">
                      Criado por:
                      <strong>{adInfo.userInfo.name}</strong>
                      <small>E-mail: {adInfo.userInfo.email}</small>
                    </div>
                    <a
                      href={`mailto:${adInfo.userInfo.email}?subject=Interesse no anúncio: ${encodeURIComponent(adInfo.title)}&body=Olá ${adInfo.userInfo.name}, tenho interesse no seu anúncio "${adInfo.title}". Podemos conversar?`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Falar com o vendedor
                    </a>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </PageArea>
    </PageContainer>
  );
};

export default Page;