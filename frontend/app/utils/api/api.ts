import axios from "axios";
// import { API_URL } from "~/constants/env.const";

const API_URL = 'http://localhost:8000' // Temporary hardcoded value for demonstration

const headers = {
  "Content-Type": "application/json",
};

const ACCESS_TOKEN_KEY = "accessToken";

export class ApiUtil {

  setCookie(name: string, value: string, days: number) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  eraseCookie(key: string) {
    document.cookie = key + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }

  getCookieByKey(key: string): string {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${key}=`);
    if (parts.length === 2) return parts?.pop()?.split(";")?.shift() || "";
    return "";
  }

  getToken(): string {
    if (!document) return "";
    return this.getCookieByKey(ACCESS_TOKEN_KEY);
  }

  setToken(token: string): void {
    const validDays = 365;
    this.setCookie(ACCESS_TOKEN_KEY, token, validDays);
  }
  eraseToken(): void {
    this.eraseCookie(ACCESS_TOKEN_KEY);
  }

  async getHeaders() {
    // onkstää ees awaitti :DD
    const token = await this.getToken();
    return {
      ...headers,
      Authorization: `Bearer ${token}`,
    };
  }

  async post({ url, payload }: { url: string; payload?: any }): Promise<any> {
    try {
      const headers = await this.getHeaders();
      const r = await axios.post(`${API_URL}${url}`, payload, { headers });
      return r?.data;
    } catch (error: any) {
      console.error("API POST ERROR:", error);
      throw error;
    }
  }

  async get({ url, query }: { url: string; query?: any }): Promise<any> {
    try {
      const headers = await this.getHeaders();

      const r = await axios.get(`${API_URL}${url}`, {
        params: query,
        headers,
      });
      return r?.data;
    } catch (error: any) {
      console.error("API GET ERROR:", error);
      throw error;
    }
  }
}

export default new ApiUtil();
