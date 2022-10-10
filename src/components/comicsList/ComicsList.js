import { useState, useEffect } from 'react';
import { useMarvelService } from '../../services/MarvelService';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(1000);
    const [comicEnded, setComicEnded] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => { 
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded);
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList < 8) {
            ended = true;
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 8);
        setComicEnded(ended)
    }

    const renderItems = (arr) => {
        const items = arr.map((elem, i) => {
            return <li className="comics__item" key={i}>
                <a href="#">
                    <img src={elem.thumbnail} alt="ultimate war" className="comics__item-img"/>
                    <div className="comics__item-name">{elem.name}</div>
                    <div className="comics__item-price">{elem.price}</div>
                </a>
            </li>
        })

        return <ul className="comics__grid">
            {items}
        </ul>
    }

    const items = renderItems(comicsList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button className="button button__main button__long"
                disabled={newItemLoading}
                style={{display: comicEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                    <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;