## Available Scripts

In the project directory, you can run:

### `npm install`

Install all the dependencies

### `npm start`

Makes the api run in [http://localhost:8080](http://localhost:8080).

## Notes

Both movies and users are stored in a mongo database.

To manage mognoDB this project use mongoose.

## Endpoints

Create user
POST: 'http://localhost:8080/user'
Body: {
        "email": string,
        "password": string,
        "firstName": string,
        "lastName": string
    }

Login user and return token. Token will expire in 1h.
POST: 'http://localhost:8080/auth/login'
Body: {
        "email": string,
        "password": string
    }

Get movies (params are not required). In case you don't send params, the api will return first page of most popular movies.
GET: http://localhost:8080/movie?keyword="someKeyword"&page=somePage
Authorization: Bearer [token]

Add movie to favourites
POST: http://localhost:8080/movie/favourites
Authorization: Bearer [token]
Body {
    "id": number,
    "title": string,
    "release_date": string,
    "overview": string
}

Get favourites movies
GET: http://localhost:8080/movie/favourites
Authorization: Bearer [token]