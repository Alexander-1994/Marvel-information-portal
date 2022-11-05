import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMarvelService } from '../../services/MarvelService';

import AppBanner from '../appBanner/AppBanner';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const SinglePage = ({Component, dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {loading, error, clearError, getComic, getCharacter} = useMarvelService(); 
     

    useEffect(() => {
        updateData();
    }, [id])

    const onDataLoaded = data => setData(data); 

    const updateData = () => {      
        clearError();

        switch (dataType) {
            case 'comic': 
                getComic(id).then(onDataLoaded);
                break;
            case 'character': 
                getCharacter(id).then(onDataLoaded);
                break;
        }
    }                                                    

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(error || loading || !data) ? <Component data={data} /> : null;

    return (
        <>
            <AppBanner />
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

export default SinglePage;