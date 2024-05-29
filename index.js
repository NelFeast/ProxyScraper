const fs = require('fs').promises;
const { api } = require('./config.json')
const request = require("request-promise");

const ProxyGen = class {
    constructor() {
        this.api = api;
        this.initialize();
    }
    async initialize() {
        const proxyData = await this.getProxies();
        await fs.writeFile('proxies.txt', proxyData);
    }
    async getProxies(options) {
        const response = await request.get(this.api, { resolveWithFullResponse: true })
        let proxies = response.body.split('\n').map(line => line.replace('\r', '')).filter(Boolean);
        return proxies.join('\n');
    }
}

new ProxyGen();