class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=cc3718966f7ae60fd4a489f88f2c3bef';
    _baseOffset = 210;

    getResource = async (url) => {                                                   /* функция отправки запроса получения данных */
        let res = await fetch(url);
        
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {                        /* функция получения всех персонажей */
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);

        return res.data.results.map(this._transformCaracter);
    }

    getCharacter = async (id) => {                                                   /* функция получения конкретного персонажа */
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);

        return this._transformCaracter(res.data.results[0]);
    }

    _transformCaracter = (char) => {                                                 /* функция трансформации объекта с данными персонажа в объект с только нужными свойствами */
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
}

export default MarvelService;