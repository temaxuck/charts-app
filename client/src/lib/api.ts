import { getAccessToken, token } from "./auth";
import { AuthError } from "./exceptions";
import { ChartData } from "./models";

export async function loginRequest(apiUrl: string, username: string, password: string): Promise<token> {
  const response = await fetch(
    apiUrl,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    });

  const json = await response.json();

  if (response.ok) {
    return json.access_token as token;
  }

  if (response.status === 401) {
    throw new AuthError(json.detail);
  }

  throw new Error("Unexpected error");
}

export async function getChartData(apiUrl: string): Promise<ChartData> {
  const token = getAccessToken();
  const response = await fetch(
    apiUrl,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    }
  );

  const json = await response.json();

  if (response.ok) {
    return ChartData.fromJSON(json);
  }

  if (response.status === 401) {
    throw new AuthError(json.detail);
  }

  throw new Error("Unknown error");
}