<template>
  <div class="b-footer row">
    <div class="col-sm-12 col-lg-8">
      <div class="row">
        <div class="col-sm-12 col-lg-4">
          <h5>Versions</h5>
          <div>
            <a href="v2/docs/introduction">version 2</a>
          </div>
        </div>
        <div class="col-sm-12 col-lg-4">
          <h5>Ecosystem</h5>
          <div><a href="https://github.com/maticnetwork/maticjs-web3">maticjs-web3</a></div>
          <div>
            <a href="https://github.com/maticnetwork/maticjs-ethers">maticjs-ethers</a>
          </div>
          <div>
            <a href="https://github.com/maticnetwork/maticjs-plasma">maticjs-plasma</a>
          </div>
          <div>
            <a href="https://github.com/fx-portal/maticjs-fxportal">maticjs-fxportal</a>
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-12 col-lg-4">
      Created with
      <i class="fas fa-heart" style="color: red;"></i> by
      <a style="color: inherit;" target="_blank" href="https://polygon.technology/">Polygon technology</a>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.b-footer {
  margin-top: 20px;
  background: var(--primary-color);
  color: white;
  padding: 20px;
  a {
    color: #d3c4ed;
    text-decoration: underline;
  }
}
</style>
