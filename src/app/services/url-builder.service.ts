import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchParam } from '../models/SearchParam';

@Injectable({
  providedIn: 'root'
})
export class UrlBuilderService {

  private productionUrl: string = ""

  constructor() { }

  buildParams(params: SearchParam[]) {
    // build parameters for url request
    if (params != null && params.length !== 0) {
      // loop through each parameter and build a string in the form of
      // ?key=value&key=value......etc
      let paramString = []
      params.forEach(parameter => {
        // if a parameter is missing a key or a value, then we do not add
        // it to the final parameter string
        if (parameter.key != null && parameter.value != null) {
          paramString.push(`${parameter.key}=${parameter.value}`)
        }
      })
      return `?${paramString.join("&")}`
    } else {
      return ""
    }
  }

  buildUrlForProduction(endpoint: string, params: SearchParam[] = []) {
    return `${this.productionUrl}/${endpoint}${this.buildParams(params)}`
  }
}
