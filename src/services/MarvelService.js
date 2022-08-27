class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=cc3718966f7ae60fd4a489f88f2c3bef';

    getResource = async (url) => {                          /* функция отправки запроса получения данных */
        let res = await fetch(url);
        
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = () => {                              /* функция получения всех персонажей */
        return this.getResource(`${this._apiBase}characters?limit=9&offset=100&${this._apiKey}`);
    }

    getCharacter = (id) => {                                /* функция получения конкретного персонажа */
        return this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
    }
}

export default MarvelService;