import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMarvelService } from '../../services/MarvelService';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);
    const {loading, error, clearError, getCharacter} = useMarvelService(); 

    useEffect(() => {
        updateCharInfo();
    }, [props.charId])

    const updateCharInfo = () => {      
        const {charId} = props;
        if (!charId) {
            return
        }
        
        clearError();
        getCharacter(props.charId)
            .then(onCharLoaded);
    }

    const onCharLoaded = (char) => {   
        setChar(char);                                                     
    }

    const skeleton = char || loading || error ? null : <Skeleton />; 
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(error || loading || !char) ? <ViewCharInfo char={char} /> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const ViewCharInfo = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    const imgStyle = thumbnail.indexOf('image_not_available') > -1 ? {objectFit: 'contain'} : {objectFit: 'cover'};
    
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                { comics.length === 0 ? 'Comics not found' : null } 
                {
                    comics.map((item, i) => {
                        if (i > 7) return;
               
                        return (
                            <li className="char__comics-item"
                                key={i}>
                                    <Link to={`comics/${item.resourceURI.slice(-5)}`}>{item.name}</Link>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    ) 
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;