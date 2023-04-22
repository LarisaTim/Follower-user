import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsReducer = createApi({
  reducerPath: 'contacts',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://64445669b80f57f581a3d4f5.mockapi.io/users/:endpoint',
  }),
  tagTypes: ['users'],
  endpoints: builder => ({
    getContacts: builder.query({
      query: () => '/',
      providesTags: result =>
        result
          ? [...result.map(el => ({ type: 'users', id: el.id })), 'users']
          : ['users'],
    }),
    addContact: builder.mutation({
      query: contacts => ({
        url: '/',
        method: 'POST',
        body: contacts,
      }),
      invalidatesTags: ['users'],
    }),
    deleteContact: builder.mutation({
      query: id => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: result =>
        result ? [{ type: 'users', id: result.id }] : ['users'],
    }),
    editContact: builder.mutation({
      query: contact => ({
        url: `/${contact.id}`,
        method: 'PUT',
        body: contact,
      }),
      invalidatesTags: result =>
        result
          ? [...result.map(el => ({ type: 'users', id: el.id }))]
          : ['users'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useEditContactMutation,
} = contactsReducer;
