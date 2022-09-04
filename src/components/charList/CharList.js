import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';
import { Component } from 'react';

import './charList.scss';

class CharList extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList < 9) {
            ended = true;
        }

        this.setState(({charList, offset}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    onError = () => {                                                                       
        this.setState({
            loading: false, 
            error: true
        })
    }

    renderItems = (arr) => {
        const items = arr.map(elem => {
            const imgStyle = elem.thumbnail.indexOf('image_not_available') > -1 ? {objectFit: 'contain'} : {objectFit: 'cover'};

            return <li className="char__item" 
                key={elem.id}
                onClick={() => this.props.onSelectedChar(elem.id)}>
                    <img src={elem.thumbnail} alt={elem.name} style={imgStyle} />
                    <div className="char__name">{elem.name}</div>
            </li>
        })

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render() {
        const {charList, loading, error, newItemLoading, offset, charEnded} = this.state;
        
        const items = this.renderItems(charList);
       
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(error || loading) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{display: charEnded ? 'none' : 'block'}}
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;