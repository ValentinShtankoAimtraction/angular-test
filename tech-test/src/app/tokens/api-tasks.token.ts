import { InjectionToken } from "@angular/core";
import { IAPITaskService } from "../models/api-tasks.model";

export const API_TASKS_SERVICE = new InjectionToken<IAPITaskService>('API_SERVICE');