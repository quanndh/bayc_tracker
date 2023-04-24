import { useEffect, useState } from "react";

const useFavorite = () => {
  const [movieIds, setMovieIds] = useState<number[]>([]);

  useEffect(() => {
    const movieIds = JSON.parse(localStorage.getItem("favorites") ?? "[]");
    setMovieIds(movieIds.map((x: string) => Number(x)));
  }, []);

  const add = (movieId: number) => {
    const temp = [...movieIds, movieId];
    localStorage.setItem("favorites", JSON.stringify(temp));
    setMovieIds(temp);
  };

  const remove = (movieId: number) => {
    const temp = [...movieIds.filter((x) => x !== movieId)];
    localStorage.setItem("favorites", JSON.stringify(temp));
    setMovieIds(temp);
  };

  return { movieIds, add, remove };
};

export default useFavorite;
