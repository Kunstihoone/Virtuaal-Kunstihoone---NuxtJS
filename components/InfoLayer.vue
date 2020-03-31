<template>
  <div class="info-layer">
    <h2>Kunstihoone videogiid</h2>
    <p>
      Cras mattis consectetur purus sit amet fermentum. Vestibulum id ligula
      porta felis euismod semper. Duis mollis, est non commodo luctus, nisi erat
      porttitor ligula, eget lacinia odio sem nec elit. Donec sed odio dui.
      Donec id elit non mi porta gravida at eget metus. Etiam porta sem
      malesuada magna mollis euismod.
    </p>
  </div>
</template>

<style lang="scss" scoped>
.info-layer {
  position: absolute;
  top: 100%;
  right: 0;
  margin-bottom: 1rem;
  width: rem-calc(320);
  box-shadow: $button-shadow;
  border-radius: 0.6rem;
  overflow: hidden;
  background-color: $white;
  padding: 1rem;
  margin-top: 1rem;

  h2 {
    margin-bottom: 0.5rem;
  }

  p {
    margin-bottom: 0;
  }
}
</style>
