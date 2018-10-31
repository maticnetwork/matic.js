<template>
  <div id="app">
    Interact with Matic Network in browser environment using Vuejs framework
    <button v-on:click="transferTokens">Transfer tokens</button>
  </div>
</template>

<script>
import matic from './matic.js'

const token = '0xC4375B7De8af5a38a93548eb8453a498222C4fF2' // test token address
const user = '0x7ed7f36694153ba6eff6ca6726b60f6e2bb17fcf' // test recepient address
const amount = '10000000000000000'
const from = '0x6e0c217de3235f1d8a95605d10bcc1b36ff7996f' // from address

export default {
  name: "app",
  methods: {
    transferTokens() {
      // Send Tokens
      matic.transferTokens(token, user, amount, {
        from,
        onTransactionHash: (resp) => {
          // action on Transaction success
          // eslint-disable-next-line
          console.log('Transaction hash:', resp)
        },
      })
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
