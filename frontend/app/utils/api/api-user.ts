import { ApiUtil } from "./api";

const ENDPOINT_PREFIX = "/users";
const USER_ENDPOINTS = {
  LOGIN: `${ENDPOINT_PREFIX}/login`,
  SIGN_UP: `${ENDPOINT_PREFIX}/create`,
  GET_BY_TOKEN: `${ENDPOINT_PREFIX}/profile`,
};

export class ApiUser extends ApiUtil {
  async login(email: string, password: string): Promise<string> {
    const { success, error, token } = await this.post({
      url: USER_ENDPOINTS.LOGIN,
      payload: { email, password },
    });

    if (success) {
      this.setToken(token);
      return "";
    }
    return error;
  }

  async signUp({
    email,
    password,
    firstName,
    lastName,
  }: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<string> {
    const { success, error } = await this.post({
      url: USER_ENDPOINTS.SIGN_UP,
      payload: { email, password, firstName, lastName },
    });

    if (success?.length) {
      this.setToken(success);
      return "";
    }
    return error;
  }

  async getUserByToken() {
    const user = await this.get({ url: USER_ENDPOINTS.GET_BY_TOKEN });
    return user;
  }
}

export default new ApiUser();
