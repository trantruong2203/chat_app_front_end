import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { createMessage, deleteMessage, fetchAllMessages, fetchMessageById, updateMessage } from "./messageApi";
import type { ApiResponse } from "./messageApi";
import type {  Message } from "../../interface/UserResponse";

export const getMessages = createAsyncThunk<Message[], void, { rejectValue: string }>(
    'message/fetchAll',
    async (_, { rejectWithValue }) => {
      try {
        return await fetchAllMessages();
      } catch (err: unknown) {
        if (err instanceof AxiosError && err.response?.data) {
          return rejectWithValue(err.response.data.message || 'Lỗi từ server');
        }
        return rejectWithValue('Lỗi không xác định');
      }
    }
  );

  export const getMessageById = createAsyncThunk<Message, number, { rejectValue: string }>(
    'message/fetchById',
    async (id, { rejectWithValue }) => {
      try {
        return await fetchMessageById(id);
      } catch (err: unknown) {
        if (err instanceof AxiosError && err.response?.data) {
          return rejectWithValue(err.response.data.message || 'Lỗi từ server');
        }
        return rejectWithValue('Lỗi không xác định');
      }
    }
  );

  export const createdMessage = createAsyncThunk<ApiResponse, Message, { rejectValue: string }>(
    'message/create',
    async (message, { rejectWithValue }) => {
      try {
        return await createMessage(message);
      } catch (err: unknown) {
        if (err instanceof AxiosError && err.response?.data) {
          return rejectWithValue(err.response.data.message || 'Lỗi từ server');
        }
        return rejectWithValue('Lỗi không xác định');
      }
    }
  );

  export const sendMessage = createAsyncThunk<Message, Message, { rejectValue: string }>(
    'message/send',
    async (message, { rejectWithValue, dispatch }) => {
      try {
        const response = await createMessage(message);
        if (response.success) {
          // Cập nhật danh sách tin nhắn sau khi gửi thành công
          dispatch(getMessages());
          return message;
        }
        return rejectWithValue('Không thể gửi tin nhắn');
      } catch (err: unknown) {
        if (err instanceof AxiosError && err.response?.data) {
          return rejectWithValue(err.response.data.message || 'Lỗi từ server');
        }
        return rejectWithValue('Lỗi không xác định');
      }
    }
  );

  export const updatedMessage = createAsyncThunk<ApiResponse, { id: number; message: Message }, { rejectValue: string }>(
    'message/update',
    async ({ id, message }, { rejectWithValue }) => {
      try {
        return await updateMessage(id, message);
      } catch (err: unknown) {
        if (err instanceof AxiosError && err.response?.data) {
          return rejectWithValue(err.response.data.message || 'Lỗi từ server');
        }
        return rejectWithValue('Lỗi không xác định');
      }
    }
  );

  export const deletedMessage = createAsyncThunk<ApiResponse, number, { rejectValue: string }>(
    'message/delete',
    async (id, { rejectWithValue }) => {
      try {
        return await deleteMessage(id);
      } catch (err: unknown) {
        if (err instanceof AxiosError && err.response?.data) {
          return rejectWithValue(err.response.data.message || 'Lỗi từ server');
        }
        return rejectWithValue('Lỗi không xác định');
      }
    }
  );