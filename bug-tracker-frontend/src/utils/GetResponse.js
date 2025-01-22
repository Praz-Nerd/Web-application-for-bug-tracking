//function for getting a response
export default async function getResponse(path, method, body) {
    let params = {
        method: method,
        headers:{'Content-Type':'application/json'}
    }
    if(method === 'POST'||method === 'PUT')params.body = body
    const response = await fetch(path, params)
    let result = await response.json()
    return result
}

