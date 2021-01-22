import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { Chef } from '../models/chef';
import { SearchParam } from '../models/SearchParam';
import { UrlBuilderService } from './url-builder.service';

@Injectable({
  providedIn: 'root'
})
export class GetChefsService {

  private endpoint: string = "registered-chefs" 

  constructor(private urlBuilder: UrlBuilderService,
              private httpClient: HttpClient) { }

  private handleResponseError(error: HttpErrorResponse) {
    let message = `Error code: ${error.status}, ${error.message}`
    console.error(message)
    return throwError(message)
  }

  getChefs(): Observable<Chef[]> {
    // for temporary testing
    return of([
        new Chef("5e21edb7e81ae7ec8cf1a24e", "Fisher", "Dyer", 
        [{
          "type": "Risotto",
          "rating": 62
        },
        {
          "type": "Pizza",
          "rating": 26
        },
        {
          "type": "Cake",
          "rating": 64
        },
        {
          "type": "Baked Potato",
          "rating": 26
        }]
        ),
        new Chef("jyukukyulyku", "james", "gher", 
        [{
          "type": "Risotto",
          "rating": 78
        },
        {
          "type": "Pizza",
          "rating": 23
        },
        {
          "type": "Cake",
          "rating": 21
        },
        {
          "type": "Baked Potato",
          "rating": 98
        }]
        ),
        new Chef("trnrnegregrerg", "Kim", "Diva", 
        [{
          "type": "Risotto",
          "rating": 12
        },
        {
          "type": "Pizza",
          "rating": 67
        },
        {
          "type": "Cake",
          "rating": 32
        },
        {
          "type": "Baked Potato",
          "rating": 23
        }]
        )
    ])

    //--- for when the registration endpoint is ready ---//
    //---------------------------------------------------//
    // create http request to get chefs from endpoint
    // let url = this.urlBuilder.buildUrlForProduction(
    //   this.endpoint,                       // the endpoint to call from the registration team
    //   [ new SearchParam("event", "1") ]    // a list of query parameters if needed (key, value)              
    // )
    // return this.httpClient.get<Chef[]>(url).pipe(
    //   catchError(this.handleResponseError)
    // )
  }
}
