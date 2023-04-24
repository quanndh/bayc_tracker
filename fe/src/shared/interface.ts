export interface IGenre {
  id: number;
  name: string;
}

export interface IMovie {
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  posterFullPath?: string;
  backdropFullPath?: string;
  genreInfo: IGenre[];
}

export interface IUser {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | undefined;
}

export interface IUserFavorite extends Omit<IMovie, "id"> {
  id: string;
  movieId: number;
  userId: string;
}

export interface Pagination<T> {
  items: T[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}
