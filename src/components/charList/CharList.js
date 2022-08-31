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
        error: false
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService.getAllCharacters()
        .then(this.onCharListLoaded)
        .catch(this.onError)
    };

    onCharListLoaded = (charList) => {
        this.setState({
            charList,
            loading: false
        })
    };

    onError = () => {                                                                       
        this.setState({
            loading: false, 
            error: true
        })
    };

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
        const {charList, loading, error} = this.state;
        
        const items = this.renderItems(charList);
       
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(error || loading) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;