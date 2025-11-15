<template>
  <div class="component-LoadingIndicatorCardDeck">
    <div class="stack">
      <div class="stack__card"></div>
      <div class="stack__card"></div>
      <div class="stack__card"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.component-LoadingIndicatorCardDeck {
  --trans-dur: 0.3s;

  .stack {
    --stack-dur: 2s;
    --stack-delay: 0.05;
    --stack-spacing: 15%;
    position: relative;
    width: 14em;
    height: 32em;
  }

  .stack__card {
    position: absolute;
    inset: 0;
    top: var(--stack-spacing);
    margin: auto;
    width: 70%;
    aspect-ratio: 1;
    transform: rotateX(45deg) rotateZ(-45deg);
    transform-style: preserve-3d;
  }

  .stack__card::before {
    content: "";
    display: block;
    position: absolute;
    inset: 0;
    background-color: var(--blue-primary);
    border-radius: 7.5%;
    box-shadow: -0.5em 0.5em 1.5em hsl(var(--blue-primary) 90% 15% / 0.1);
    animation: card var(--stack-dur) infinite;
  }

  .stack__card:nth-child(2) {
    top: 0;
  }
  .stack__card:nth-child(2)::before {
    background-color: var(--blue-primary);
    animation-delay: calc(var(--stack-dur) * (-1 + var(--stack-delay)));
  }
  .stack__card:nth-child(3) {
    top: calc(var(--stack-spacing) * -1);

    &:before {
      animation-delay: calc(var(--stack-dur) * (-1 + var(--stack-delay) * 2));
      content: "NFT";
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
    }
  }
  .stack__card:nth-child(3)::before {
    background-color: var(--blue-primary);
    animation-delay: calc(var(--stack-dur) * (-1 + var(--stack-delay) * 2));
  }

  /* Animaatio */
  @keyframes card {
    0%,
    100% {
      transform: translateZ(0);
    }
    11% {
      opacity: 1;
      transform: translateZ(0.125em);
    }
    34% {
      opacity: 0;
      transform: translateZ(-12em);
    }
    48% {
      opacity: 0;
      transform: translateZ(12em);
    }
    57% {
      opacity: 1;
      transform: translateZ(0);
    }
    61% {
      transform: translateZ(-1.8em);
    }
    74% {
      transform: translateZ(0.6em);
    }
    87% {
      transform: translateZ(-0.2em);
    }
  }

  &.small {
    .stack {
      width: 7em;
      height: 16em;
    }
  }
}
</style>
