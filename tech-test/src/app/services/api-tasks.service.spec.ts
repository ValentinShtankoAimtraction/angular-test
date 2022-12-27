import { HttpClient, HttpRequest, HttpResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";

import { ApiTasksService } from "./api-tasks.service";
import { environment } from "@env/environment";
import { filter } from "rxjs/operators";
import { ITaskTypes } from "@models/task.model";
import { forkJoin } from "rxjs";

const mockResponse = [
  {
    id: 1,
    label: "Task 1",
    description: "Task 1 description",
    done: false,
    category: "cat-1",
  },
  {
    id: 2,
    label: "Task 2",
    description: "Task 2 description",
    done: "11-11-1111",
    category: "cat-2",
  },
];

describe("ApiTasksService", () => {
  let service: ApiTasksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiTasksService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiTasksService);
    httpMock = TestBed.get(HttpTestingController);

    service.changeFilter({ category: "", type: ITaskTypes.ALL });
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should get list of tasks", (done) => {
    service.list();

    service.tasks$.subscribe((data) => {
      expect(data).toEqual(mockResponse);
      done();
    });

    const req = httpMock.expectOne(environment.api.host + "/tasks");
    expect(req.request.method).toEqual("GET");
    req.flush(mockResponse);
  });

  it("should return filter list of tasks", (done) => {
    const expectedItems = [
      {
        id: 1,
        label: "Task 1",
        description: "Task 1 description",
        done: false,
        category: "cat-1",
      },
    ];
    service.list();
    service.changeFilter({ category: "cat-1" });

    service.tasks$.subscribe((data) => {
      expect(data).toEqual(expectedItems);
      done();
    });

    const req = httpMock.expectOne(environment.api.host + "/tasks");
    expect(req.request.method).toEqual("GET");
    req.flush(mockResponse);
  });

  it("should return only active tasks", (done) => {
    const expectedItems = [
      {
        id: 1,
        label: "Task 1",
        description: "Task 1 description",
        done: false,
        category: "cat-1",
      },
    ];
    service.list();
    service.changeFilter({ type: ITaskTypes.ACTIVE });

    service.tasks$.subscribe((data) => {
      expect(data).toEqual(expectedItems);
      done();
    });

    const req = httpMock.expectOne(environment.api.host + "/tasks");
    expect(req.request.method).toEqual("GET");
    req.flush(mockResponse);
  });

  it("should return only completed tasks", (done) => {
    const expectedItems = [
      {
        id: 2,
        label: "Task 2",
        description: "Task 2 description",
        done: "11-11-1111",
        category: "cat-2",
      },
    ];
    service.list();
    service.changeFilter({ type: ITaskTypes.COMPLETED });

    service.tasks$.subscribe((data) => {
      expect(data).toEqual(expectedItems);
      done();
    });

    const req = httpMock.expectOne(environment.api.host + "/tasks");
    expect(req.request.method).toEqual("GET");
    req.flush(mockResponse);
  });

  it("should return length of results", (done) => {
    const expectedLength = mockResponse.length;
    service.list();

    service.count$.subscribe((data) => {
      expect(data).toEqual(expectedLength);
      done();
    });

    const req = httpMock.expectOne(environment.api.host + "/tasks");
    expect(req.request.method).toEqual("GET");
    req.flush(mockResponse);
  });

  it("should return task by id", (done) => {
    const mockItem = {
      id: 1,
      label: "Task 1",
      description: "Task 1 description",
      done: false,
      category: "cat-1",
    };

    service.get(mockItem.id).subscribe((data) => {
      expect(data).toEqual(mockItem);
      done();
    });

    const req = httpMock.expectOne(environment.api.host + "/tasks/" + 1);
    expect(req.request.method).toEqual("GET");

    req.flush(mockItem);
  });

  it("should add a new task", (done) => {
    const mockItem = {
      id: 3,
      label: "Task 3",
      description: "Task 3 description",
      done: false,
      category: "cat-1",
    };
    const mockPushResponse = [...mockResponse, mockItem];
    service.post(mockItem);
    const postReq = httpMock.expectOne({
      url: environment.api.host + "/tasks",
      method: "POST",
    });
    postReq.flush(mockItem);
    service.tasks$.subscribe((data) => {
      expect(data).toEqual(mockPushResponse);
      done();
    });
    const req = httpMock.expectOne({
      url: environment.api.host + "/tasks",
      method: "GET",
    });
    req.flush(mockPushResponse);
  });

  it("should update an existing task", (done) => {
    const mockItem = {
      id: 1,
      label: "Task 1",
      description: "Task 1 description",
      done: false,
      category: "cat-2",
    };
    const mockPatchResponse = mockResponse.map((item) => {
      if (item.id === mockItem.id) {
        return mockItem;
      }
      return item;
    });
    service.patch(mockItem);
    const postReq = httpMock.expectOne({
      url: environment.api.host + "/tasks/" + mockItem.id,
      method: "PATCH",
    });
    postReq.flush(mockItem);
    service.tasks$.subscribe((data) => {
      expect(data).toEqual(mockPatchResponse);
      done();
    });
    const req = httpMock.expectOne({
      url: environment.api.host + "/tasks",
      method: "GET",
    });
    req.flush(mockPatchResponse);
  });

  it("should delete an existing task", (done) => {
    const mockItem = {
      id: 1,
    };
    service.delete(mockItem.id);

    const mockDeleteResponse = mockResponse.filter(
      ({ id }) => id !== mockItem.id
    );
    const deleteReq = httpMock.expectOne({
      url: environment.api.host + "/tasks/" + mockItem.id,
      method: "DELETE",
    });
    deleteReq.flush({});
    service.tasks$.subscribe((data) => {
      expect(data).toEqual(mockDeleteResponse);
      done();
    });

    const req = httpMock.expectOne({
      url: environment.api.host + "/tasks",
      method: "GET",
    });
    req.flush(mockDeleteResponse);
  });

  it("should return a categories", (done) => {
    const mockCategories = ["cat-1", "cat-2", "cat-3"];
    service.categories().subscribe((data) => {
      expect(data).toEqual(mockCategories);
      expect(data.length).toEqual(3);
      done();
    });
    const req = httpMock.expectOne(environment.api.host + "/categories");
    req.flush(mockCategories);
  });
});
