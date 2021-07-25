const { getMaticPOSClient, pos, from } = require('../../utils')

const token = pos.child.erc1155

const execute = async () => {
  try {
    let tx = await getMaticPOSClient().burnSingleERC1155(
      token, //token address
      '123', // id to burn
      '1' // amount of id token to burn
    )

    console.log(tx) // eslint-disable-line
  } catch (e) {
    console.error(e) // eslint-disable-line
  }
}
execute().then(() => process.exit(0))
