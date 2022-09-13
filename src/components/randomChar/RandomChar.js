import { Component } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
    state = {
        char: {},
        loading: true,
        error: false
    } // у нас есть три состояния данного компонента: персонаж, загрузка, ошибка. Загрузился персонаж - отоброжаем персонажа. Выполняется загрузка - отоброжаем спиннер. Появилась ошибка - отоброжаем гифку с ошибкой

    marvelService = new MarvelService();

    onCharLoaded = (char) => {                                                              /* метод изменения state (при загрузке рандомного персонажа) */
        this.setState({
            char, 
            loading: false
        })
    }

    onError = () => {                                                                       /* метод изменения state (при возникновении ошибки) */
        this.setState({
            loading: false, 
            error: true
        })
    }

    onCharLoading = () => {                                                                 /* метод обновляет loading в true >>> При обновении персонажа, перед выполнением запроса "мелькнёт" спиннер */
        this.setState({
            loading: true
        })
    }

    updateChar = () => {                                                                    /* метод обновления рандомного персонажа */
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

        this.onCharLoading();
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    componentDidMount = () => {                                                             /* хук "монтирования" компонента */
        this.updateChar();
        this.timerId = setInterval(this.updateChar, 5000);
    }

    componentWillUnmount = () => {                                                          /* хук "размонтирования" компонента */
        clearInterval(this.timerId);
    }

    render() {
        const {char, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? <ViewChar char={char} /> : null;
        
        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner"
                             onClick={this.updateChar}>
                                try it
                        </div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const ViewChar = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;
    const imgStyle = thumbnail.indexOf('image_not_available') > -1 ? {objectFit: 'contain'} : {objectFit: 'cover'};

    return (
        <div className="randomchar__block">
            <img src={thumbnail} style={imgStyle} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;