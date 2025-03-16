export type token = string;

export function getAccessToken(): token | null {
  return localStorage.getItem("access_token");
}

export function setAccessToken(accessToken: token) {
  return localStorage.setItem("access_token", accessToken);
}

export function removeAccessToken() {
  return localStorage.removeItem("access_token");
}