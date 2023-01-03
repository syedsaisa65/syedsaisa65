import { blueedApi } from './../baseQuery';
import {
  DOCUMENT_CREATE_API_PATH,
  DOCUMENT_DELETE_API_PATH,
  GET_ALL_DOCUMENT_LIST_API_PATH,
  GET_DOCUMENT_EDIT_LINK_API_PATH,
  GET_PROJECT_DOCUMENT_LIST_API_PATH,
  SEND_FOR_REVIEW_API_PATH,
  DOCUMENT_PREVIEW_API_PATH,
  DOCUMENT_COPY_API_PATH,
  DOCUMENT_GENERATE_THUMBNAIL,
  DOCUMENT_REVIEW_EDIT_LINK
} from 'config/ApiList';
export const DocumentApi = blueedApi.injectEndpoints({
  endpoints: (builder) => ({
    getDocuments: builder.query({
      query: (paginationData) => {
        const { IsShared = false, limit = 15, pagNum, search = '' } = paginationData;
        return {
          url: GET_ALL_DOCUMENT_LIST_API_PATH,
          method: 'GET',
          params: {
            IsShared: IsShared,
            PageSize: limit,
            PageNumber: pagNum,
            Name: search
          }
        };
      },
      providesTags: ['DocumentApi']
    }),
    getProjectDocuments: builder.query({
      query: (params) => {
        return {
          url: GET_PROJECT_DOCUMENT_LIST_API_PATH,
          method: 'GET',
          params: params
        };
      },
      providesTags: ['DocumentApi']
    }),
    getDocumentEditLink: builder.query({
      query: (data) => {
        return {
          url: GET_DOCUMENT_EDIT_LINK_API_PATH,
          method: 'GET',
          params: { DriveItemID: data?.Id, DocumentActionUserID: data?.documentActionUserID }
        };
      }
    }),
    getDocumentReviewEditLink: builder.query({
      query: (body) => {
        return {
          url: DOCUMENT_REVIEW_EDIT_LINK,
          method: 'POST',
          body: body
        };
      }
    }),
    sendForReviewCall: builder.query({
      query: (body) => {
        return {
          url: SEND_FOR_REVIEW_API_PATH,
          method: 'POST',
          body: body
        };
      }
    }),
    addDocument: builder.mutation({
      query: (body) => {
        return {
          url: DOCUMENT_CREATE_API_PATH,
          method: 'POST',
          body: body
        };
      },
      invalidatesTags: ['DocumentApi']
    }),
    deleteDocument: builder.mutation({
      query: (query) => {
        return {
          url: DOCUMENT_DELETE_API_PATH,
          method: 'DELETE',
          params: { documentId: query }
        };
      },
      invalidatesTags: ['DocumentApi']
    }),
    documentPreview: builder.query({
      query: (id) => {
        return {
          url: DOCUMENT_PREVIEW_API_PATH,
          method: 'GET',
          params: { itemID: id }
        };
      }
    }),
    originalDocumentPreview: builder.mutation({
      query: (params) => {
        return {
          url: DOCUMENT_PREVIEW_API_PATH,
          method: 'GET',
          params: params
        };
      },
      invalidatesTags: ['DocumentApi']
    }),
    documentCopy: builder.mutation({
      query: (body) => {
        return {
          url: DOCUMENT_COPY_API_PATH,
          method: 'POST',
          body: body
        };
      },
      invalidatesTags: ['DocumentApi']
    }),
    documentThumbnail: builder.mutation({
      query: (data) => {
        return {
          url: DOCUMENT_GENERATE_THUMBNAIL,
          method: 'GET',
          params: {
            DriveItemID: data?.driveItemID,
            DocumentActionUserID: data?.documentActionUserID
          }
        };
      },
      invalidatesTags: ['DocumentApi']
    })
  })
});

export const {
  useGetDocumentsQuery,
  useGetProjectDocumentsQuery,
  useAddDocumentMutation,
  useDeleteDocumentMutation,
  useDocumentCopyMutation,
  useSendForReviewCallQuery,
  useDocumentPreviewMutation,
  useDocumentThumbnailMutation,
  useGetDocumentReviewEditLinkQuery
} = DocumentApi;
