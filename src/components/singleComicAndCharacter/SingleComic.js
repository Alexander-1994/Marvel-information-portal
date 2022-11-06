import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';

import './singleStyle.scss';

const SingleComic = ({data}) => {
    const {name, description, pageCount, thumbnail, language, price} = data;
    const navigate = useNavigate();

    return (
        <div className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content={`${name} comics book`} />
                <title>{name}</title>
            </Helmet>

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