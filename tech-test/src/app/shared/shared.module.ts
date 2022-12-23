import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SHARED_COMPONENTS } from "./components";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatExpansionModule } from "@angular/material/expansion";

const MATERIAL_MODULES = [
  MatSelectModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatExpansionModule,
];

@NgModule({
  declarations: [SHARED_COMPONENTS],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...MATERIAL_MODULES,
  ],
  exports: [...SHARED_COMPONENTS, ...MATERIAL_MODULES],
})
export class SharedModule {}
