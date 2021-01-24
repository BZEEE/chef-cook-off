import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingScreenComponent } from './loading-screen.component';

describe('LoadingScreenComponent', () => {
    let component: LoadingScreenComponent;
    let fixture: ComponentFixture<LoadingScreenComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ LoadingScreenComponent ]
      })
      .compileComponents();
    }));
  

    beforeEach(() => {
      fixture = TestBed.createComponent(LoadingScreenComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it("loading", () => { 
        component.show()
        expect(component.loading).toEqual(true)
    })
    it("not loading", () => { 
        component.hide()
        expect(component.loading).toEqual(false)
    })
});
