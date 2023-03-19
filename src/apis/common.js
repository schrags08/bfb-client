const VUE_APP_SERVICE_ORIGIN = process.env.VUE_APP_SERVICE_URL_ORIGIN;
const VUE_APP_SERVICE_PATHNAME = process.env.VUE_APP_SERVICE_URL_PATHNAME;

export const SERVICE_URL = `${VUE_APP_SERVICE_ORIGIN}${VUE_APP_SERVICE_PATHNAME}`;

export function getHeaders() {
  return {
    "Content-Type": "application/json",
  };
}

export function handleApiError(error) {
  console.error(error);
}
