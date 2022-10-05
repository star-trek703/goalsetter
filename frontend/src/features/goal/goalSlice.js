import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";

const initialState = {
  goals: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ''
}

export const getGoals = createAsyncThunk('goals/getGoals', async (thunkAPI) => {
  try {
    return await goalService.getGoals()
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const createGoal = createAsyncThunk('goals/createGoal', async (goalData, thunkAPI) => {
  try {
    return await goalService.createGoal(goalData)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const deleteGoal = createAsyncThunk('goals/deleteGoal', async (id, thunkAPI) => {
  try {
    return await goalService.deleteGoal(id)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getGoals.fulfilled, (state, actions) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals = actions.payload
      })
      .addCase(getGoals.rejected, (state, actions) => {
        state.isLoading = false
        state.isError = true
        state.message = actions.payload
      })
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createGoal.fulfilled, (state, actions) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals = [...state.goals, actions.payload]
      })
      .addCase(createGoal.rejected, (state, actions) => {
        state.isLoading = false
        state.isError = true
        state.message = actions.payload
      })
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteGoal.fulfilled, (state, actions) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals = state.goals.filter(goal => goal._id !== actions.payload.id)
      })
      .addCase(deleteGoal.rejected, (state, actions) => {
        state.isLoading = false
        state.isError = true
        state.message = actions.payload
      })
  }
})

export const { reset } = goalSlice.actions
export default goalSlice.reducer
