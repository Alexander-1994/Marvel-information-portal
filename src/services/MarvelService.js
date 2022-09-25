import { useHttp } from "../hooks/http.hook";

export const useMarvelService = () => {
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=cc3718966f7ae60fd4a489f88f2c3bef';
    const _baseOffset = 210;

    const {loading, error, request, clearError} = useHttp();

    const _transformCaracter = (char) => {                                                
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const getAllCharacters = async (offset = _baseOffset) => {                       
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);

        return res.data.results.map(_transformCaracter);
    }

    const getCharacter = async (id) => {                          
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);

        return _transformCaracter(res.data.results[0]);
    }

    return {
        loading,
        error,
        clearError,
        getAllCharacters,
        getCharacter
    }
}