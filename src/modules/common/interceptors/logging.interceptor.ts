import { Interceptor, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Interceptor()
export class LoggingInterceptor implements NestInterceptor {
  intercept(dataOrRequest, context: ExecutionContext, stream$: Observable<any>): Observable<any> {
    const now = Date.now();
    const method = dataOrRequest.method;
    const route = dataOrRequest.originalUrl;

    return stream$.do(
      () => console.log(`\n${method} ${route} ${Date.now() - now}ms`),
    );
  }
}