<template>
  <div class="container">
    <h2 class="subtitle">Welcome to Matic.js!</h2>
    <div class="grid">
      <div>
        <button @click="onTransfer" class="button--green">Transfer</button>
      </div>
      <div>
        <button @click="onDeposit" class="button--green">Deposit</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import matic from "~/plugins/matic";

const amount = "1000000000000000000";

export default {
  computed: mapState(["from", "token", "recepient"]),
  methods: {
    onTransfer() {
      matic.transferTokens(this.token, this.recepient, amount, {
        from: this.from,
        onTransactionHash: hash => {
          // action on Transaction success
          // eslint-disable-next-line
          console.log(hash);
        },
        onError: err => {
          console.log(err);
        }
      });
    },
    onDeposit() {
      matic
      .approveERC20TokensForDeposit(this.token, amount, {
        from: this.from,
        onTransactionHash: (hash) => {
          // action on Transaction success
          console.log(hash) // eslint-disable-line
        },
      })
      .then(() => {
        // Deposit tokens
        matic.depositERC20Tokens(this.token, this.from, amount, {
          from: this.from,
          onTransactionHash: (hash) => {
            // action on Transaction success
            console.log(hash) // eslint-disable-line
          },
        })
      })
    }
  }
};
</script>

<style>
.grid {
  display: grid;
  grid-template-columns: 40vw 40vw;
  grid-template-areas: ". .";
}

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
  margin-bottom: 1rem;
}
</style>
