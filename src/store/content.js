import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { createSelector } from "reselect";

const slice = createSlice({
    name: 'content',
    initialState: {
        loadingFree: false,
        loadingLive: false,
        updatingFree: false,

        fetchedFree: false,
        fetchedLive: false,
        updateFreeSuccess: false,
        updateLiveSuccess: false,

        fetchFreeFailed: false,
        fetchLiveFailed: false,
        updateFreeFailed: false,
        updateLiveFailed: false,

        freeData: null,
        liveData: null,
    },
    reducers: {
        reset: content => {
            content.loadingFree = false;
            content.loadingLive = false;

            content.fetchedFree = false;
            content.fetchedLive = false;

            content.fetchFreeFailed = false;
            content.fetchLiveFailed = false;

            content.freeData = null;
            content.liveData = null;
        },
        resetUpdate: user => {
            user.updatingFree = false;
            user.updateFreeFailed = false;
            user.updateFreeSuccess = false;

            user.updatingLive = false;
            user.updateLiveFailed = false;
            user.updateLiveSuccess = false;
        },

        fetchFreeLoading: content => {
            content.loadingFree = true;
        },

        fetchFreeSuccess: (content, action) => {
            content.loadingFree = false;
            content.fetchedFree = true;
            content.fetchFreeFailed = false;
            content.freeData = action.payload.data
        },

        fetchFreeFailure: content => {
            content.loadingFree = false;
            content.fetchFreeFailed = true;
            content.fetchedFree = false;
            content.freeData = null
        },

        updateFreeStatusLoading: (content) => {
            content.updatingFree = true;
        },
        //get success
        updateFreeStatusSuccess: (content, action) => {
            content.updatingFree = false;
            content.updateFreeSuccess = true;
            content.updateFreeFailed = false;
        },
        //get err
        updateFreeStatusFailed: (content) => {
            content.updatingFree = false;
            content.updateFreeSuccess = false;
            content.updateFreeFailed = true;
        },

        fetchLiveLoading: content => {
            content.loadingLive = true;
        },

        fetchLiveSuccess: (content, action) => {
            content.loadingLive = false;
            content.fetchedLive = true;
            content.fetchLiveFailed = false;
            content.liveData = action.payload.data
        },

        fetchLiveFailure: content => {
            content.loadingLive = false;
            content.fetchLiveFailed = true;
            content.fetchedLive = false;
            content.liveData = null
        },

        updateLiveStatusLoading: (content) => {
            content.updatingLive = true;
        },
        //get success
        updateLiveStatusSuccess: (content, action) => {
            content.updatingLive = false;
            content.updateLiveSuccess = true;
            content.updateLiveFailed = false;
        },
        //get err
        updateLiveStatusFailed: (content) => {
            content.updatingLive = false;
            content.updateLiveSuccess = false;
            content.updateLiveFailed = true;
        },
    }
})

const {
    fetchFreeLoading,
    fetchFreeSuccess,
    fetchFreeFailure,
    updateFreeStatusLoading,
    updateFreeStatusSuccess,
    updateFreeStatusFailed,
    fetchLiveLoading,
    fetchLiveSuccess,
    fetchLiveFailure,
    updateLiveStatusLoading,
    updateLiveStatusSuccess,
    updateLiveStatusFailed,
    reset,
    resetUpdate
} = slice.actions;

export const getFreeContents = (value) => (dispatch) => {
    dispatch(
        apiCallBegan({
            url: `/free?searchKey=${value?.search}&offset=${value?.offset}&limit=${value?.limit}`,
            method: "get",
            type: "content",
            onStart: fetchFreeLoading.type,
            onSuccess: fetchFreeSuccess.type,
            onError: fetchFreeFailure.type,
        })
    );
};

export const updateQuestion = (value) => (dispatch) => {
    let url = "/updateFree";
    dispatch(
        apiCallBegan({
            url,
            method: "post",
            type: "content",
            data: value.data,
            onStart: updateFreeStatusLoading.type,
            onSuccess: updateFreeStatusSuccess.type,
            onError: updateFreeStatusFailed.type,
        })
    );
};
export const getLiveContents = (value) => (dispatch) => {
    dispatch(
        apiCallBegan({
            url: `/live?searchKey=${value?.search}&offset=${value?.offset}&limit=${value?.limit}`,
            method: "get",
            type: "content",
            onStart: fetchLiveLoading.type,
            onSuccess: fetchLiveSuccess.type,
            onError: fetchLiveFailure.type,
        })
    );
};

export const updateLiveQuestion = (value) => (dispatch) => {
    let url = "";
    dispatch(
        apiCallBegan({
            url,
            method: "post",
            type: "content",
            data: value.data,
            onStart: updateLiveStatusLoading.type,
            onSuccess: updateLiveStatusSuccess.type,
            onError: updateLiveStatusFailed.type,
        })
    );
};

export const resetData = () => (dispatch) => dispatch({ type: reset.type });
export const resetUpdateData = () => (dispatch) => dispatch({ type: resetUpdate.type });


export const contents = createSelector(
    (state) => state.entities.content,
    (content) => content
);

export default slice.reducer;