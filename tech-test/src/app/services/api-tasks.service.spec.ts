import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';

import { ApiTasksService } from './api-tasks.service';

describe('ApiTasksService', () => {
  let service: ApiTasksService;
  let httpClient: HttpClient;

  beforeEach(() => {
    httpClient = jasmine.createSpyObj('HttpClient', ['post', 'get', 'delete', 'patch']);


    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpClient }]
    });
    service = TestBed.inject(ApiTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get list of tasks', () => {
    service.list();
    expect(httpClient.get).toHaveBeenCalled();
  })

  it('should get a task', () => {
    service.get(1);
    expect(httpClient.get).toHaveBeenCalled();
  })

  it('should update a task', () => {  
    const reloadSpy = spyOn(service,'list');
    service.patch({});
    expect(httpClient.patch).toHaveBeenCalled();
  })

  it('should create a task', () => {  
    service.post({});
    expect(httpClient.post).toHaveBeenCalled();
  })

  it('should delete a task', () => {  
    service.delete(1);
    expect(httpClient.delete).toHaveBeenCalled();
  })

});
