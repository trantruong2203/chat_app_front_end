import { createSlice } from "@reduxjs/toolkit";
import type { Message } from "../../interface/UserResponse";
import { createdMessage, deletedMessage, getMessages, sendMessage, updatedMessage } from "./messageThunks";

interface MessageState {
  items: Message[];
  message: {
    id: number;
    senderid: number;
    receiverid: number;
    groupid: number;
    content: string;
    sentat: string; // Chuyển từ Date sang string
    status: number;
    messageid: number;
  };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const innerValue = {
  id: 0,
  senderid: 0,
  receiverid: 0,
  groupid: 0,
  content: '',
  sentat: new Date().toISOString(), // Chuyển từ Date object sang string ISO
  status: 0,
  messageid: 0,
};

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    items: [] as Message[],
    message: innerValue,
    status: 'idle',
    error: null as string | null,
  } as MessageState,
  reducers: {
    handleChange: (state, action) => {
      state.message = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getMessages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.items = action.payload as Message[];
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || null;
      })
      // CREATE
      .addCase(createdMessage.fulfilled, (state, action) => {
        if (action.payload) {
          state.items.push(action.payload.data);
        }
        state.error = null;
      })
      .addCase(createdMessage.rejected, (state, action) => {
        state.error = action.payload as string || null;
      })
      // SEND MESSAGE
      .addCase(sendMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        // Thêm tin nhắn vào danh sách nếu có
        if (action.payload) {
          state.items.push(action.payload);
        }
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || null;
      })
      // UPDATE
      .addCase(updatedMessage.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (message) => message.id === action.payload.data.id
        );
        if (index !== -1) {
          state.items[index] = action.payload.data;
        }
        state.error = null;
      })
      .addCase(updatedMessage.rejected, (state, action) => {
        state.error = action.payload as string || null;
      })
      // DELETE
      .addCase(deletedMessage.fulfilled, (state, action) => {
        const idToDelete = action.meta.arg;
        if (idToDelete) {
          const newItems = state.items.filter(item => {
            const result = item.id !== idToDelete;
            return result;
          });
          state.items = newItems;
        }
        state.error = null;
      })
      .addCase(deletedMessage.rejected, (state, action) => {
        state.error = action.payload as string || null;
      })
  }
});

export const { handleChange, setMessage } = messageSlice.actions;
export default messageSlice.reducer;