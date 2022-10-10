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

    const _transformComic = (comic) => {                                                
        return {
            id: comic.id,
            name: comic.title,
            thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
            price: comic.prices[0].price ? `${comic.prices[0].price}$` : 'not available'
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

    const getAllComics = async (offset = 0) => {                       
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);

        return res.data.results.map(_transformComic);
    }

    return {
        loading,
        error,
        clearError,
        getAllCharacters,
        getCharacter,
        getAllComics
    }
}