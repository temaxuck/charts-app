import { token } from "./auth";
import { AuthError } from "./exceptions";

export async function loginRequest(apiUrl: string, username: string, password: string): Promise<token> {
  try {
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
    if (!response.ok) {
      throw new Error(json.detail);
    }
    return json.access_token as token;
  } catch (error) {
    const message = (error as Error).message;
    if (!!message)
      throw new AuthError("Login failed", message);
    throw new AuthError("Login failed", null);
  }
}