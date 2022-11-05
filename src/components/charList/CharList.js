import { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useMarvelService } from '../../services/MarvelService';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded);
    };

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }

    const itemRefs = useRef([])

    const focusOnItem = (id) => {
        itemRefs.current.forEach(elem => elem.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    const renderItems = (arr) => {
        const items = arr.map((elem, i) => {
            const imgStyle = elem.thumbnail.indexOf('image_not_available') > -1 ? {objectFit: 'contain'} : {objectFit: 'cover'};

            return (
                <CSSTransition key={elem.id} timeout={1500} classNames="char__item">
                    <li 
                        className="char__item" 
                        tabIndex={0}
                        ref={elem => itemRefs.current[i] = elem}
                        onClick={() => { 
                            props.onSelectedChar(elem.id); 
                            focusOnItem(i);
                        }}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' || e.key === '') {
                                props.onSelectedChar(elem.id); 
                                focusOnItem(i);
                            }
                        }}>
                            <img src={elem.thumbnail} alt={elem.name} style={imgStyle} />
                            <div className="char__name">{elem.name}</div>
                    </li>
                </CSSTransition>
            )
        })

        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }
    
    const items = renderItems(charList);
    
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button className="button button__main button__long"
                disabled={newItemLoading}
                style={{display: charEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onSelectedChar: PropTypes.func.isRequired
}

export default CharList;