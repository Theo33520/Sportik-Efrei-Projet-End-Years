// api.ts
import { Api } from "../../../../api/src/generated/typing";


const baseURL: string = "http://localhost:3000";

const api = new Api({
  baseURL,
  withCredentials: true,
});

if (!baseURL) {
  throw new Error("API base URL is not defined");
}

const logger = console;

api.instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => Promise.reject(err),
);

api.instance.interceptors.response.use(
  (res) => {
    logger.info("✅ Request succeeded", {
      url: res.config?.url,
      status: res.status,
    });
    return res;
  },
  (err) => {
    logger.error("❌ Request failed", {
      message: err.message,
      url: err.config?.url,
      method: err.config?.method,
      status: err.response?.status,
      data: err.response?.data,
    });
    return Promise.reject(err);
  },
);

export default api;
