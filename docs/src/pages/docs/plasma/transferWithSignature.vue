<template><Layout title='undefined' description='undefined' keywords='undefined' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/plasma/transferWithSignature.md'><h1 id="transferwithsignature">Transfer with Signature</h1>
<pre><code class="js language-js">matic.transferWithSignature(sig, toSell, toBuy, orderFiller)
</code></pre>
<p>Executes <a href="https://github.com/maticnetwork/contracts/blob/a9b77252ece25adcd3f74443411821883bb970e6/contracts/child/BaseERC20.sol#L35">transferWithSig</a> on child token (erc20/721). Takes input as signature generated from <code>matic.getTransferSignature</code></p>
<ul>
<li><code>sig</code>: signature generated with matic.getTransferSignature</li>
<li><code>toSell</code>: object</li>
<li><code>token</code>: address of token owned,</li>
<li><code>amount</code>: amount/tokenId of the token to sell,</li>
<li><code>expiry</code>: expiry (block number after which the signature should be invalid),</li>
<li><code>orderId</code>: a random 32 byte hex string,</li>
<li><code>spender</code>: the address approved to execute this transaction</li>
<li><code>toBuy</code>: object</li>
<li><code>token</code>: address of token to buy</li>
<li><code>amount</code>: amount/tokenId of token to buy</li>
<li><code>orderFiller</code>: address of user to transfer the tokens to</li>
<li><code>options</code> see <a href="#approveERC20TokensForDeposit">more infomation here</a></li>
<li><code>from</code>: the approved spender in the <code>toSell</code> object by the token owner</li>
</ul>
<p>transfers <code>toSell.token</code> from <code>tokenOwner</code> to <code>orderFiller</code></p>
<pre><code class="javascript language-javascript">// sell order
let toSell = {
  token: token2,
  amount: value2,
  expiry: expire,
  orderId: orderId,
  spender: spender,
}

// buy order
let toBuy = {
  token: token1,
  amount: value1,
}

let sig = await matic.getTransferSignature(toSell, toBuy, { from: tokenOwner })

const tx = await matic.transferWithSignature(
  sig, // signature with the intent to buy tokens
  toSell, // sell order
  toBuy, // buy order
  orderFiller, // order fulfiller
  {
    from: spender, // approved spender
  }
)
</code></pre>
<hr /></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        