import {
  Catch,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
} from '@nestjs/common'
import { Response, Request } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): Response {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()

    console.log(exception.stack)

    return response.status(status).json({
      statusCode: status,
      timestamp: new Date().toUTCString(),
      path: request.url,
      error: exception.message,
      stack: exception.stack,
    })
  }
}
