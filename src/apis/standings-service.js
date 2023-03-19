import axios from "axios";
import { SERVICE_URL } from "@/apis/common";

export function getBowlersFromStandingsFile(file) {
  const url = `${SERVICE_URL}/upload/standings`;
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const formData = new FormData();

  formData.append("file-to-upload", file);

  return axios.post(url, formData, config).then((res) => res.data);
}
