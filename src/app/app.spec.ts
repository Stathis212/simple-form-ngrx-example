import {} from 'jasmine';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('App', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({ declarations: [AppComponent] });
    });
    it('App created!', () => {
      const fixture = TestBed.createComponent(AppComponent);
      expect(fixture.componentInstance instanceof AppComponent).toBe(
        true,
        'should create AppComponent',
      );
    });

    it('says I\'m your father!', () => {
      const fixture = TestBed.createComponent(AppComponent);
      spyOn(fixture.componentInstance, 'helloWorld').and.returnValue('I\'m your father!');
    });
});
