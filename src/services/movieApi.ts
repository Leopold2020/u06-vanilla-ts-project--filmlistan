// API-anrop till Movie API

export async function addMovie(
                        movie: 
                        {
                            tmdb_id: string | number,
                            id: string | number
                            title:any,
                            poster_path:any,
                            release_date:any,
                            vote_average:any,
                            overview:any,
                            status:any,
                            personal_rating:any,
                            review:any,
                            is_favorite:any,
                            date_watched:any
                        }
        ) {
        const {
      tmdb_id,
      id,
      title,
      poster_path,
      release_date,
      vote_average,
      overview,
      status,
      personal_rating,
      review,
      is_favorite,
      date_watched
    } = movie
    return new Promise((resolve: (res: Response) => void, reject) => {
    try {
            fetch("http://localhost:3000/api/movies", {
                method: "POST",
                body: JSON.stringify({
                    tmdb_id: tmdb_id || id,
                    title: title,
                    poster_path: poster_path,
                    release_date: release_date,
                    vote_average: vote_average,
                    overview: overview,
                    status: status,
                    personal_rating: personal_rating,
                    review: review,
                    is_favorite: is_favorite,
                    date_watched: date_watched
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(response=>response.json())
            .then((data)=>{
                resolve(data)
            })
            
        } catch (error) {
            console.error(error)
            reject(error)
        }
    })
};

export async function getMovies(status:string) {
    return new Promise((resolve: (res: Response) => void, reject) => {
    try {
            fetch(`http://localhost:3000/api/movies?status=${status}`, {
                method: "get",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(response=>response.json())
            .then((data)=>{
                    // if (data && Array.isArray(data.results)) {
                    // data.results.forEach((movie: { id: number }) => {
                    //     localStorage.setItem(movie.id.toString(), JSON.stringify(true));
                    // });
                    // } else {
                    // data.results = [];
                    // }
                resolve(data)
            })
            
        } catch (error) {
            console.error(error)
            reject(error)
        }
    })
};

export async function deleteMovie(id:string | number) {
    return new Promise((resolve: (res: Response) => void, reject) => {
    try {
            fetch(`http://localhost:3000/api/movies/${id}`, {
                method: "delete",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(response=>response.json())
            .then((data)=>{
                resolve(data)
            })
            
        } catch (error) {
            console.error(error)
            reject(error)
        }
    })
};

export async function updateMovie(
        id: string | number,
        status: string,
        personal_rating: number,
        review: string | null,
        is_favorite: number | BinaryType,
        date_watched: string | null
    ) {
    return new Promise((resolve: (res: Response) => void, reject) => {
    try {
            fetch(`http://localhost:3000/api/movies/${id}`, {
                method: "put",
                body: JSON.stringify({
                    status: status,
                    personal_rating: personal_rating,
                    review: review,
                    is_favorite: is_favorite,
                    date_watched: date_watched
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(response=>response.json())
            .then((data)=>{  
                resolve(data)
            })
            
        } catch (error) {
            console.error(error)
            reject(error)
        }
    })
};