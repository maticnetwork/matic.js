<template><Layout title='undefined' description='undefined' keywords='undefined' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/v2/docs/plasma/getTransferSignature.md'><h1 id="gettransfersignature">Get Transfer Signature</h1>
<pre><code class="js language-js">matic.getTransferSignature(toSell, toBuy)
</code></pre>
<p>Off-chain signature generation for <a href="https://github.com/maticnetwork/contracts/blob/a9b77252ece25adcd3f74443411821883bb970e6/contracts/child/BaseERC20.sol#L35">transferWithSig</a> function call</p>
<ul>
<li><p><code>toSell</code> object</p></li>
<li><p><code>token</code>: address of token owned,</p></li>
<li><p><code>amount</code>: amount/tokenId of the token to sell,</p></li>
<li><p><code>expiry</code>: expiry (block number after which the signature should be invalid),</p></li>
<li><p><code>orderId</code>: a random 32 byte hex string,</p></li>
<li><p><code>spender</code>: the address approved to execute this transaction</p></li>
<li><p><code>toBuy</code> object</p></li>
<li><p><code>token</code>: address of token to buy</p></li>
<li><p><code>amount</code>: amount/tokenId of token to buy</p></li>
<li><p><code>options</code> see <a href="#approveERC20TokensForDeposit">more infomation here</a></p></li>
<li><p><code>from</code>: owner of the token (toSell)</p></li>
</ul>
<pre><code class="javascript language-javascript">  // sell order
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

  const sig = await matic.getTransferSignature(toSell, toBuy, {
    from: tokenOwner,
  })
</code></pre>
<hr /></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/v2/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        