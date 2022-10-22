import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useMarvelService } from '../../services/MarvelService';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './singleComic.scss';

const SingleComic = () => {
    const [comic, setComic] = useState(null);
    const {loading, error, clearError, getComic} = useMarvelService(); 
    const {comicId} = useParams(); 

    useEffect(() => {
        updateComic();
    }, [comicId])

    const updateComic = () => {      
        clearError();
        getComic(comicId)
            .then(onComicLoaded);
    }

    const onComicLoaded = (comic) => {   
        setComic(comic);                                                     
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(error || loading || !comic) ? <ViewComic comic={comic} /> : null;

    return (
        <div className="char__info">
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const ViewComic = ({comic}) => {
    const {name, description, pageCount, thumbnail, language, price} = comic;
    const navigate = useNavigate();
    return (
        <div className="single-comic">
            <img src={thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">{language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link onClick={() => navigate(-1)} className="single-comic__back back">Back to all</Link>
        </div>
    )
}

export default SingleComic;