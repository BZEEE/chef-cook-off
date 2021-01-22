import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { Chef } from '../models/chef';
import { SearchParam } from '../models/SearchParam';
import { UrlBuilderService } from './url-builder.service';

@Injectable({
  providedIn: 'root'
})
export class GetChefsService {

  private endpoint: string = "api/registered-chefs" 

  constructor(private urlBuilder: UrlBuilderService,
              private httpClient: HttpClient) { }

  private handleResponseError(error: HttpErrorResponse) {
    let message = `Error code: ${error.status}, ${error.message}`
    console.warn(message)
    return throwError(message)
  }

  getChefs(): Observable<Chef[]> {
    //--- for when the registration production endpoint is ready ---//
    //---------------------------------------------------//
    // create http request to get chefs from endpoint
    // let url = this.urlBuilder.buildUrlForNodeApi(
    //   this.endpoint,                       // the endpoint to call from the registration team
    //   []    // a list of query parameters if needed (key, value)              
    // )
    // return this.httpClient.get<Chef[]>(url).pipe(
    // map(chefObject => chefObject["chefs"]),  
    // catchError(this.handleResponseError)
    // )


    //--- for when the registration production endpoint is ready ---//
    //---------------------------------------------------//
    // create http request to get chefs from endpoint
    let url = this.urlBuilder.buildUrlForProduction(
      this.endpoint,                       // the endpoint to call from the registration team
      []    // a list of query parameters if needed (key, value)              
    )
    return this.httpClient.get<Chef[]>(url).pipe(
    map(chefObject => chefObject["chefs"]),  
    catchError(this.handleResponseError)
    )
  }
}
