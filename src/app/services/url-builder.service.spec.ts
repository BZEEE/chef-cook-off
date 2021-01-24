import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchParam } from '../models/search-param';
import { UrlBuilderService } from './url-builder.service';

describe('UrlBuilderService', () => {
  let service: UrlBuilderService;
  
    beforeEach(() => {
      service = TestBed.inject(UrlBuilderService);
    });
  
    it('should create', () => {
      expect(service).toBeTruthy();
    });

    it("node url", () => { 
        let url = service.buildUrlForNodeApi("endpoint")
        expect(url).toEqual(`${service.getNodeUrl()}/endpoint`)
        url = service.buildUrlForNodeApi("endpoint", [new SearchParam("key1", "value1"), new SearchParam("key2", "value2"),])
        expect(url).toEqual(`${service.getNodeUrl()}/endpoint?key1=value1&key2=value2`)
    })
    it("production url", () => { 
        let url = service.buildUrlForProduction("endpoint")
        expect(url).toEqual(`${service.getProductionUrl()}/endpoint`)
        url = service.buildUrlForProduction("endpoint", [new SearchParam("key1", "value1"), new SearchParam("key2", "value2"),])
        expect(url).toEqual(`${service.getProductionUrl()}/endpoint?key1=value1&key2=value2`)
    })

});
