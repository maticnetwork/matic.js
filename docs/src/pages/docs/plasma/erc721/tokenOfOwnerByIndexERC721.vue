<template><Layout title='undefined' description='undefined' keywords='undefined' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/plasma/erc721/tokenOfOwnerByIndexERC721.md'><h1 id="tokenofownerbyindexerc721">Token Of Owner By Index ERC721</h1>
<pre><code class="js language-js">matic.tokenOfOwnerByIndexERC721(userAddress, token, index, options)
</code></pre>
<p>Get ERC721 tokenId at <code>index</code> for <code>token</code> and for <code>address</code>.</p>
<ul>
<li><code>token</code> must be valid token address</li>
<li><code>userAddress</code> must be valid user address</li>
<li><code>index</code> index of tokenId</li>
</ul>
<p>This returns matic <code>tokenId</code>.</p>
<p>Example:</p>
<pre><code class="js language-js">matic
  .tokenOfOwnerByIndexERC721('0xfeb14b...', '21', 0, {
    from: '0xABc578455...',
  })
  .then(tokenID =&gt; {
    console.log('Token ID', tokenID)
  })
</code></pre>
<hr /></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        