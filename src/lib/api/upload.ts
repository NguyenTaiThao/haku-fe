import { AxiosRequestConfig } from "axios";
import { request } from "lib/request";

export function uploadApi(
  file: File,
  config?: AxiosRequestConfig,
  type = "images"
) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type);

  return request({
    ...config,
    data: formData,
    method: config?.method || "POST",
    url: config?.url || "upload-file",
  });
}
