/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ParsersService } from './parsers.service';

describe('Service: Parsers', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParsersService]
    });
  });

  it('should ...', inject([ParsersService], (service: ParsersService) => {
    expect(service).toBeTruthy();
  }));
});
