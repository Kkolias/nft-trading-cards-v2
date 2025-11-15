<template>
  <div class="component-ButtonWithLoader">
    <button
      :disabled="disabled"
      :type="parsedButtonType"
      :class="[buttonClass, { loading: loading }]"
      @click="(e) => doClick(e)"
    >
      <LoadingIndicator class="absolute-center" v-if="loading" />
      <slot v-else></slot>
    </button>
  </div>
</template>

<script lang="ts">
import { ButtonTypes } from "~/enums/button-types.enum";
// ei toimi
export default {
  props: {
    buttonType: {
      type: String as () => ButtonTypes,
      default: ButtonTypes.button,
    },
    loading: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    buttonClass: {
      type: String,
      default: "primary",
    },
  },
  computed: {
    parsedButtonType(): ButtonTypes | undefined {
      return this.buttonType as ButtonTypes | undefined;
    },
  },
  methods: {
    doClick(e: Event): void {
      // e.preventDefault()
      if (!this.loading) {
        this.$emit("click", e);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.component-ButtonWithLoader {
  position: relative;

  button {
    min-width: 80px;

    &.loading {
      cursor: default !important;
    }
  }
}
</style>
