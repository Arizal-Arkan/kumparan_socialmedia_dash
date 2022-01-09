import axios from 'axios';

const host = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
  });

const api = {
    getListUser: () => host.get("users", {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }),

    getDetailUser: (id) => host.get(`users/${id}`, id, {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }),

    getPostUser: (id) => host.get(`posts?userId=${id}`, {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }),

    getAlbumUser: (id) => host.get(`albums?userId=${id}`, {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }),

    getDetailPost: (id) => host.get(`albums?userId=${id}`, {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }),

    getPostDetail: (postId) => host.get(`posts/${postId}`, {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }),

    getComment: (postId) => host.get(`posts/${postId}/comments`, {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }),

    getDetailAlbum: (postId) => host.get(`albums/${postId}`, {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }),

    getPhoto: (postId) => host.get(`albums/${postId}/photos`, {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }),
}

export default api;