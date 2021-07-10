import {create} from "apisauce"

const version = "v1"

export const api = create({
    baseURL: `http://localhost:5005/${version}/`,
    headers: { Accept: 'application/vnd.github.v3+json'},
})