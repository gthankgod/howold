export default function responseHandler (res,data=null, code, status = "error", message = "Invalid data" ) {
    let responseCodes = {
        "200": "OK",
        "400": "Bad Request",
        "429": "Rate Limited",
        "503": "Server Error"
    }

    if(!responseCodes[code]) code = 400;
    return res.status(code).json({ status, data, message: `${responseCodes[code]}, ${message}.`})
}
