export class HttpRequest {
    baseUrl = "";
    private fetch_: (input: RequestInfo, init?: RequestInit) => Promise<Response> = window ? window.fetch : require('node-fetch');

    constructor(option: { baseUrl: string } | string = {} as any) {
        option = typeof option === "string" ? {
            baseUrl: option
        } : option;

        if (option.baseUrl) {
            this.baseUrl = option.baseUrl;
        }
    }

    get<T>(url = "", query = {}): Promise<T> {
        url = this.baseUrl + url + Object.keys(query).
            map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`).join('&');

        return this.fetch_(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res => {
            return res.json();
        });
    }

    post(url = "", body) {
        url = this.baseUrl + url;

        return this.fetch_(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: body ? JSON.stringify(body) : null
        }).then(res => {
            return res.json();
        });
    }
}