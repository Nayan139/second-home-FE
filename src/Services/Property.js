import { toastMessage } from "../Components/Toaster/Toaster.js";
import { RESPONSEFLAGS } from "../Constant/index.js";
import axiosInstance from "../Interceptor/AxiosInterceptor.js";

export const postCreateProperty = (data) =>
  axiosInstance
    .post(`/property/create`, data)
    .then((response) => {
      toastMessage(response?.message, RESPONSEFLAGS.SUCCESS);
      return response;
    })
    .catch((error) => {
      console.error(error);
      toastMessage(error?.response?.data?.message, RESPONSEFLAGS.ERROR);
      return error;
    });

export const getAllProperty = () =>
  axiosInstance
    .get(`/property/all`)
    .then((response) => {
      toastMessage(response?.message, RESPONSEFLAGS.SUCCESS);
      return response;
    })
    .catch((error) => {
      console.error(error);
      toastMessage(error?.response?.data?.message, RESPONSEFLAGS.ERROR);
      return error;
    });

export const patchProperty = (data, id) =>
  axiosInstance
    .patch(`/property/${id}/update`, data)
    .then((response) => {
      toastMessage(response?.message, RESPONSEFLAGS.SUCCESS);
      return response;
    })
    .catch((error) => {
      console.error(error);
      toastMessage(error?.response?.data?.message, RESPONSEFLAGS.ERROR);
      return error;
    });

export const deleteProperty = (id) =>
  axiosInstance
    .delete(`/property/${id}/delete`)
    .then((response) => {
      toastMessage(response?.message, RESPONSEFLAGS.SUCCESS);
      return response;
    })
    .catch((error) => {
      console.error(error);
      toastMessage(error?.response?.data?.message, RESPONSEFLAGS.ERROR);
      return error;
    });

export const postSearchProperty = (data) =>
  axiosInstance
    .post(`/property/get`, data)
    .then((response) => {
      // toastMessage(response?.message, RESPONSEFLAGS.SUCCESS);
      return response;
    })
    .catch((error) => {
      console.error(error);
      toastMessage(error?.response?.data?.message, RESPONSEFLAGS.ERROR);
      return error;
    });
