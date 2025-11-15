<template>
  <div class="component-LoginForm">
    <div class="login-form-wrapper">
      <h1>Kirjaudu</h1>
      <form @submit.prevent="(e) => submit(e)">
        <div v-if="errorMessage.length" class="error-wrapper">
          <p class="error-message">{{ errorMessage }}</p>
        </div>

        <div class="input-wrapper">
          <label for="email">Email:</label>
          <input
            v-model="email"
            type="text"
            id="email"
            @click="setErrorMessage('')"
          />
        </div>
        <div class="input-wrapper">
          <label for="psw">Password:</label>
          <input
            v-model="password"
            type="password"
            id="psw"
            @click="setErrorMessage('')"
          />
        </div>
        <div class="bottom-wrapper">
          <p class="new-user">
            No user? Create a new user
            <NuxtLink to="sign-up" class="href-btn">here</NuxtLink>
          </p>
          <div class="button-wrapper">
            <button v-if="!loading" class="primary" @click="submit">
              <span> Login </span>
            </button>
            <LoadingIndicator v-else />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import apiUser from "@/utils/api/api-user";
import { ButtonTypes } from "~/enums/button-types.enum";
// const config = useRuntimeConfig();

interface LoginFormData {
  ButtonTypes: typeof ButtonTypes;
  email: string;
  password: string;
  errorMessage: string;
  loading: boolean;
}

const ERROR = {
  WRONG_PASSWORD: "wrong password",
  NO_USER_FOUND: "no user found",
};

export default {
  data: (): LoginFormData => ({
    ButtonTypes,
    email: "",
    password: "",

    errorMessage: "",

    loading: false,
  }),
  methods: {
    async submit(e: Event) {
      if (this.loading) return;
      this.setLoading(true);
      e.preventDefault();

      const error = await apiUser.login(this.email, this.password);

      if (error?.length) {
        if (error === ERROR.WRONG_PASSWORD) {
          this.setErrorMessage("Antamasi salasana on väärä.");
        } else if (error === ERROR.NO_USER_FOUND) {
          this.setErrorMessage("Sähköpostilla ei löydy käyttäjää.");
        } else {
          this.setErrorMessage(
            "Virhe kirjautuessa palveluun. Yritä uudelleen."
          );
        }
      } else {
        this.setErrorMessage("");
        this.$router.push("/dashboard");
      }
      this.setLoading(false);
    },
    setLoading(value: boolean): void {
      this.loading = value;
    },
    setErrorMessage(message: string): void {
      this.errorMessage = message;
    },
  },
};
</script>

<style lang="less" scoped>
.component-LoginForm {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .login-form-wrapper {
    border: 2px solid var(--white-1);
    border-radius: 10px;
    padding: 24px;

    h1 {
      text-align: center;
    }

    max-width: 350px;
    margin: auto;

    form {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .error-wrapper {
        .error-message {
          text-align: center;
          color: var(--error-color);
          margin: 0;
        }
      }

      .input-wrapper {
        display: flex;
        flex-direction: column;
        gap: 4px;
        position: relative;

        input {
          width: 350px;
        }
      }

      .bottom-wrapper {
        display: flex;
        justify-content: space-between;
        .new-user {
          font-size: 14px;
          text-align: left;
          text-wrap: nowrap;

          .href-btn {
          }
        }

        .button-wrapper {
          margin-top: 4px;
          width: 100%;
          display: flex;
          justify-content: flex-end;
        }
      }
    }
  }
}
</style>
