import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charInfo.scss';

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateCharInfo();
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.charId !== prevProps.charId) {
            this.updateCharInfo();
        }
    }

    updateCharInfo = () => {      
        const {charId} = this.props;
        if (!charId) {
            return
        }
        
        this.onCharLoading();
        this.marvelService
            .getCharacter(this.props.charId)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onCharLoaded = (char) => {                                                           
        this.setState({
            char, 
            loading: false
        })
    }

    onError = () => {                                                                       
        this.setState({
            loading: false, 
            error: true
        })
    }

    onCharLoading = () => {
        this.setState({                                                          
            loading: true
        })
    }

    render() {
        const {char, loading, error} = this.state;

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
                        if (i > 9) return

                        return (
                            <li className="char__comics-item"
                                key={i}>
                                    {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    ) 
}

export default CharInfo;