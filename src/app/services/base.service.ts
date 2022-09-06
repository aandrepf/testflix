import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

import { environment } from './../../environments/environment';

export abstract class BaseService {
  protected baseUrl: string = environment.base_url;

  protected obterHeaderJson() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  protected extractData(response: any) {
    return response.data || {};
  }

  protected serviceError(response: Response | any) {
    const customError: string[] = [];

    if (response instanceof HttpErrorResponse) {
      if (response.statusText === 'OK') {
        customError.push('Ocorreu um erro desconhecido');
        response.error.errors = customError;
      }
    }

    return throwError(response);
  }
}
