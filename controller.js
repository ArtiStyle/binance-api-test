class BitcoinController {
    #bitcoin
    #bitcoinPrices
    #commission = process.env.BITCOIN_COMMISSION
    constructor() {
        setInterval(async () => {
            await this.#syncBitcoin()
        }, process.env.BITCOIN_FETCH_INTERVAL || 1000)
    }

    async #syncBitcoin() {
        this.#bitcoin = await (await fetch(process.env.BINANCE_API_URL)).json() || this.#bitcoin
        this.#bitcoinPrices = this.#formula(this.#bitcoin)
    }

    async #formula(bitcoin) {
        const bidPrice = bitcoin.bidPrice * (1 + this.#commission)
        const askPrice = bitcoin.askPrice * (1 + this.#commission)
        const midPrice = (bidPrice + askPrice) / 2
        return {
            bidPrice,
            askPrice,
            midPrice
        }
    }

    async get() {
        return new Promise((resolve, _) => resolve(this.#bitcoinPrices));
    }
}
module.exports = BitcoinController;
