import AXIOS from "axios";
import Parameters from "shared/parameters";

function getPublicInstance() {
  return AXIOS.create({
    // @ts-ignore
    accept: "application/json",
    baseURL: Parameters.ApiUrl,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

function getProtectedInstance() {
  let user = localStorage.getItem("user") as string;
  let token = "";
  if (user) {
    token = JSON.parse(user).token;
  } else {
    window.location.href = "/login";
  }
  return AXIOS.create({
    // @ts-ignore
    accept: "application/json",
    baseURL: Parameters.ApiUrl,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

function getProtectedFileUpload() {
  let user = localStorage.getItem("user") as string;
  let token = "";
  if (user) {
    token = JSON.parse(user).token;
  } else {
    window.location.href = "/login";
  }
  return AXIOS.create({
    // @ts-ignore
    accept: "application/json",
    baseURL: Parameters.ApiUrl,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
}

function handleErrors(error: any) {
  let message = "Something went wrong!!";
  if (error && error.response && error.response.data) {
    const data = error.response.data;
    if (data.error) {
      message = data.error;
    } else if (data.message) {
      const keys = Object.keys(data.message);
      if (keys.length) {
        message = data.message[keys[0]];
      }
    }
  }
  return message;
}

//auth
async function login(username: string, password: string) {
  const instance = getPublicInstance();
  return await instance.post("/api/authenticate", { username, password });
}

async function forgotPassword(email: string) {
  const instance = getPublicInstance();
  return await instance.post("/api/forgot-password", { email });
}

async function resetPassword(email: any, otp: any) {
  const instance = getPublicInstance();
  return await instance.post("/api/reset-password", { email, otp });
}

async function changePassword(uuid: any, password: string) {
  const instance = getPublicInstance();
  return await instance.post("/api/reset-password", { uuid, password });
}

async function self() {
  const instance = getProtectedInstance();
  return await instance.get("/admin/self");
}

async function register(email: string, name: string) {
  const instance = getPublicInstance();
  const data: any = {
    name: name,
    email: email,
  };
  return await instance.post("/api/register", data);
}

async function fileUpload(type: any, file: any) {
  const formdata = new FormData();
  formdata.append("file", file);
  formdata.append("type", type);
  const instance = getProtectedInstance();
  return await instance.post("/api/files", formdata);
}

const API_SERVICE = {
  login,
  forgotPassword,
  resetPassword,
  changePassword,
  self,
  register,
  fileUpload,
  handleErrors,
  getProtectedFileUpload,
};
export default API_SERVICE;
