import Axios from 'axios'
import APIConfig from './APIConfig.json'
import ResponseParser from './ResponseParser'

const request = (config) => {

    return new Promise((resolve, reject) => {

        try {

            // get request configuration
            const requestConfig = getRequestConfig(config)
            // console.log(requestConfig)

            // send request
            Axios(requestConfig)

                // on success
                .then(response => {

                    // if response needs formartting 
                    if (requestConfig.responseParser) {

                        // format response using formatter function 
                        const format = ResponseParser[requestConfig.responseParser]
                        const formattedResponse = format(response.data)
                        resolve(formattedResponse)

                    } else {

                        // return unformatted response
                        resolve(response.data)
                    }
                })

                // on failure
                .catch(error => {
                    reject(error)
                })

        } catch (error) {
            reject(error)
        }
    })
}

// returns the request configuration 
const getRequestConfig = (config) => {

    try {

        // create main url from api config file
        const mainUrl = `${APIConfig.protocol}://${APIConfig.address}${APIConfig.path}`

        // get access token from user state and API-KEY from api config file
        const authorization = {
            'access-token': `Bearer`,
            'api-key': `Api-Key`,
        }

        // get service configuration from api config file
        const serviceConfig = APIConfig.services[config.serviceName]

        // get function configuration from service 
        const functionConfig = serviceConfig.functions[config.functionName]

        const payload = {
            params: functionConfig.method === 'GET' && config.payload ? config.payload : config.queryParams ? config.queryParams : null,
            data: functionConfig.method !== 'GET' ? config.payload : null
        }

        const urlExtension = config.urlExtension ? `/${config.urlExtension}/` : ''

        // build request configuration
        return {
            method: functionConfig.method,
            url: `${mainUrl}${serviceConfig.path}${functionConfig.path}${urlExtension}`,
            responseParser: functionConfig.responseParser,
            ...payload,
            headers: {
                Authorization: authorization[functionConfig.authorization],
            },
            paramsSerializer: config.paramsSerializer ? config.paramsSerializer : null
        }
    }

    catch (error) {
        // console.warn(error)
    }

}

export {
    request
}
