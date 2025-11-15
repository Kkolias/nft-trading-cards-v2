<script lang="ts">
import userApi from "../utils/api/api-user";

// refactoraa storeen myöhemmin
export default {
  data: () => ({
    user: null,
    isLogged: false,
  }),
  async mounted() {
    this.checkIsLogged();
  },
  methods: {
    async getUser() {
      this.user = await userApi.getUserByToken();
    },
    async checkIsLogged(): Promise<void> {
      await this.getUser();

      this.isLogged = !!this.user;
    },
  },
};
</script>
