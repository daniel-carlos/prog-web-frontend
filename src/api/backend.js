import create from "apisauce"

export const api = create({
    baseURL: 'https://api.github.com',
    headers: { Accept: 'application/vnd.github.v3+json' },
})