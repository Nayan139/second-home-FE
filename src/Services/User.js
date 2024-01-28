import { toastMessage } from "../Components/Toaster/Toaster.js";
import { RESPONSEFLAGS } from "../Constant/index.js";
import axiosInstance from "../Interceptor/AxiosInterceptor.js";

export const postCreateUser = (data) =>
  axiosInstance
    .post(`/signup`, data)
    .then((response) => {
      toastMessage(response?.message, RESPONSEFLAGS.SUCCESS);
      return response?.data;
    })
    .catch((error) => {
      console.error(error);
      toastMessage(error?.response?.data?.message, RESPONSEFLAGS.ERROR);
      return error;
    });

export const postLogin = (data) =>
  axiosInstance
    .post(`/login`, data)
    .then((response) => {
      toastMessage(response?.message, RESPONSEFLAGS.SUCCESS);
      return response?.data;
    })
    .catch((error) => {
      console.error(error);
      toastMessage(error?.response?.data?.message, RESPONSEFLAGS.ERROR);
      return error;
    });

export const patchForgotPassword = (data) =>
  axiosInstance
    .patch(`/user/forgot-password`, data)
    .then((response) => {
      toastMessage(response?.message, RESPONSEFLAGS.SUCCESS);
      return response;
    })
    .catch((error) => {
      console.error(error);
      toastMessage(error?.response?.data?.message, RESPONSEFLAGS.ERROR);
      return error;
    });

export const patchUpdateUser = (data, userId) =>
  axiosInstance
    .patch(`/user/${userId}/update`, data)
    .then((response) => {
      toastMessage(response?.message, RESPONSEFLAGS.SUCCESS);
      return response;
    })
    .catch((error) => {
      console.error(error);
      toastMessage(error?.response?.data?.message, RESPONSEFLAGS.ERROR);
      return error;
    });

export const DeleteUser = (userId) =>
  axiosInstance
    .delete(`/user/${userId}/delete`)
    .then((response) => {
      toastMessage(response?.message, RESPONSEFLAGS.SUCCESS);
      return response;
    })
    .catch((error) => {
      console.error(error);
      toastMessage(error?.response?.data?.message, RESPONSEFLAGS.ERROR);
      return error;
    });

export const getActiveUser = () =>
  axiosInstance
    .get(`/user/active`)
    .then((response) => {
      // toastMessage(response?.message, RESPONSEFLAGS.SUCCESS);
      return response?.data;
    })
    .catch((error) => {
      console.error(error);
      toastMessage(error?.response?.data?.message, RESPONSEFLAGS.ERROR);
      return error;
    });

export const getAllUser = () =>
  axiosInstance
    .get(`/user/all`)
    .then((response) => {
      toastMessage(response?.message, RESPONSEFLAGS.SUCCESS);
      return response?.data;
    })
    .catch((error) => {
      console.error(error);
      toastMessage(error?.response?.data?.message, RESPONSEFLAGS.ERROR);
      return error;
    });
