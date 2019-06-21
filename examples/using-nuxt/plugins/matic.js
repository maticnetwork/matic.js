import Matic from 'maticjs'

let matic = null

// Create sdk instance
function initMatic() {
    if (!matic) {
        matic = new Matic({
            maticProvider: process.env.MATIC_PROVIDER,
            parentProvider: process.env.PARENT_PROVIDER,
            rootChainAddress: process.env.ROOTCHAIN_ADDRESS,
            maticWethAddress: process.env.MATIC_WETH_ADDRESS,
            syncerUrl: process.env.SYNCER_URL,
            watcherUrl: process.env.WATCHER_URL,
            withdrawManagerAddress: process.env.WITHDRAWMANAGER_ADDRESS,
        })

        // your private key, prefixed with '0x'
        matic.wallet = '<private-key>'
    }

    return matic
}

export default initMatic()
