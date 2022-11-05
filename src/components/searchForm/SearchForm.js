import { useState } from "react";
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Link} from 'react-router-dom';

import { useMarvelService } from "../../services/MarvelService";
import ErrorMessage from '../errorMessage/ErrorMessage';

import './searchForm.scss';

const SearchForm = () => {
    const [char, setChar] = useState(null);
    const {loading, error, clearError, getCharacterName} = useMarvelService();

    const onCharLoaded = char => setChar(char); 
    
    const updateChar = name => {
        clearError();

        getCharacterName(name)
            .then(onCharLoaded)
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const results = !char ? null : char.length > 0 ?
                    <div className="search-form__wrapper">
                        <div className="search-form__message">There is! Visit {char[0].name} page?</div>
                        <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                            <div className="inner">To page</div>
                        </Link>
                    </div> : 
                    <div className="search-form__error">
                        The character was not found. Check the name and try again
                    </div>; 
    return (
        <div className="search-form">
            <Formik 
                initialValues={{charName: ''}}
                validationSchema={Yup.object({charName: Yup.string().required('This field is required')})}
                onSubmit={({charName}) => updateChar(charName)}>
                    <Form>
                        <label htmlFor="name">Or find a character by name:</label>
                        <div className="search-form__wrapper">
                            <Field className="search-form__enter"
                                placeholder="Enter name"
                                id="name"
                                name="charName"
                                type="text"
                            />
                            <button className="button button__main" type="submit" disabled={loading}>
                                <div className="inner">FIND</div>
                            </button>
                        </div>
                        <FormikErrorMessage className="search-form__error" name="charName" component="div" />
                    </Form>
            </Formik>
            {results}
            {errorMessage}
        </div>
    )
}

export default SearchForm;