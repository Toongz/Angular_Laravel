import { Movie } from "./movie";
import { User } from "./user";


export class Review {
    'user_id': any;
    'movie_id': any;
    'rate_content': any;
    'rating': any;
    'created_at': Date;
    'movie': Movie;
    'user': User;
    
}
