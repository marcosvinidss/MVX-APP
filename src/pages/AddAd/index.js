import React, { useState, useEffect, useRef } from "react";
import { PageArea } from './styled';
import useApi from '../../helpers/MvxApi';
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';
import MaskedInput from "react-text-mask";
import { createNumberMask } from "text-mask-addons";
import { X } from "lucide-react";


const AddAd = () => {
    const api = useApi();

    const fileField = useRef();

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [priceNegotiable, setPriceNegotiable] = useState(false);
    const [desc, setDesc] = useState(''); // aqui o estado desc
    const [images, setImages] = useState([]);
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [disable, setDisable] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories()
    }, [])

    useEffect(() => {
        const loadCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        };
        loadCategories();
    }, [api]);

    const handleImageChange = (e) => {
        setImages([...e.target.files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisable(true);
        setError('');

        if (!title.trim()) {
            setError('Título é obrigatório.');
            setDisable(false);
            return;
        }

        if (!category) {
            setError('Selecione uma categoria.');
            setDisable(false);
            return;
        }
        const formData = new FormData();
        formData.append('title', title);
        formData.append('price', price);
        formData.append('priceneg', priceNegotiable);
        formData.append('desc', desc);
        formData.append('cat', category);

        images.forEach((img) => {
            formData.append('img', img);
        });

        const json = await api.addAd(formData);

        if (json.error) {
            setError(json.error);
        } else {
            window.location.href = `/ad/${json.id}`;
        }

        setDisable(false);
    };



    const priceMask = createNumberMask({
        prefix: 'RS ',
        includeThousandSeparator: true,
        thousandSeparatorSimbol: '.',
        allowDecimal: true,
        decimalSimbol: ','
    })

    return (
        <PageContainer>
            <PageArea>
                <form onSubmit={handleSubmit}>
                    <div className="form-title">POSTAR ANÚNCIO</div>

                    <label className="area">
                        <div className="area--title">Título</div>
                        <div className="area--input">
                            <input
                                type="text"
                                disabled={disable}
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                required
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Categoria</div>
                        <div className="area--input">
                            <select
                                disabled={disable}
                                onChange={e => setCategory(e.target.value)}
                                required
                            >
                                <option value="">Selecione a categoria</option>
                                {categories.map(cat => (
                                    <option key={cat._id || cat.id} value={cat._id || cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Preço</div>
                        <div className="area--input">

                            <MaskedInput
                                mask={priceMask}
                                placeholder="R$ 0,00"
                                disabled={disable}
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                            />
                        </div>
                    </label>

                    <label className="area checkbox-area">
                        <div className="area--title">Preço Negociável</div>
                        <div className="area--input">
                            <input
                                type="checkbox"
                                disabled={disable}
                                checked={priceNegotiable}
                                onChange={() => setPriceNegotiable(!priceNegotiable)}
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Descrição</div>
                        <div className="area--input">
                            <textarea
                                disabled={disable}
                                value={desc}
                                onChange={e => setDesc(e.target.value)}
                            ></textarea>
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Imagens (pode selecionar várias)</div>
                        <div className="area--input">
                            <input
                                type="file"
                                disabled={disable}
                                multiple
                                ref={fileField}
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disable}>Postar Anúncio</button>
                        </div>
                    </label>
                </form>

                {error && <ErrorMessage>{error}</ErrorMessage>}
            </PageArea>
        </PageContainer>
    );
};

export default AddAd;
