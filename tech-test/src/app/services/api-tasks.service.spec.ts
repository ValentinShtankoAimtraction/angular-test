import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ApiTasksService } from './api-tasks.service';

describe('ApiTasksService', () => {
  let service: ApiTasksService;
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpClientSpy }]
    });
    service = TestBed.inject(ApiTasksService);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
