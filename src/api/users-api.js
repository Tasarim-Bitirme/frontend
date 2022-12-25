import { API } from '.';

export const getUserDetail = async () => {
  const { data } = await API.get('users/me');

  // Group bookshelves by visibility
  const bookshelves = data.bookshelves.reduce((group, bookshelf) => {
    const { visible } = bookshelf;

    group[visible.toLowerCase()] = group[visible.toLowerCase()] ?? [];
    group[visible.toLowerCase()].push(bookshelf);
    return group;
  }, {});

  return {
    ...data,
    bookshelves,
  };
};

export const getAllUserBookshelves = () => API.get('users/bookshelves');

export const getUserBookshelfDetail = async (bookshelfId) => {
  const response = await API.get(`users/bookshelves/${bookshelfId}`);
  return response.data;
};

export const forkBookshelf = async (bookshelfId) => {
  const response = await API.post(`users/bookshelf/${bookshelfId}/fork`);
  return response.data;
};
