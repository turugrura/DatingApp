import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err) {
          console.log(err);

          switch (err.status) {
            case 400:
              if (err.error?.errors) {
                const modalStateErrors = [];
                for (const key in err.error.errors) {
                  if (err.error.errors[key]) {
                    modalStateErrors.push(err.error.errors[key]);
                  }
                }

                throw modalStateErrors;
              } else {
                this.notificationService.error(err.error, err.statusText);
              }
              break;
            case 401:
              this.notificationService.error(err.error, err.statusText);
              break;
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
            case 500:
              const navigationExtras: NavigationExtras = {
                state: { error: err.error },
              };
              this.router.navigateByUrl('/server-error', navigationExtras);
              break;
            default:
              this.notificationService.error(err.error, err.statusText);
              break;
          }
        }

        return throwError(err);
      })
    );
  }
}
