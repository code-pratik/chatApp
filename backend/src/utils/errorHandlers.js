
export const sendResponse = (res,statusCode,data,message) =>{
    return res.status(statusCode).json(
        {
            status: 'success',
            message:  message,
            data: data,
          }
    )
}

export const sendResponseError = (res,statusCode,message) =>{
    return res.status(statusCode).json(
         {
            status: 'failure',
            error:message
          }
    )
}