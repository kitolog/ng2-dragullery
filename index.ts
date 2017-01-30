import {NgModule, ModuleWithProviders} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DragulleryComponent} from "./src/dragullery.component";
import {DragulleryService} from "./src/dragullery.service";
import {DragulaModule} from "ng2-dragula";
import {MaterialModule} from "@angular/material";

export * from './src/dragullery.component';
export * from './src/dragullery.service';

@NgModule({
  imports: [
    CommonModule,
    DragulaModule,
    MaterialModule.forRoot()
  ],
  declarations: [
    DragulleryComponent
  ],
  exports: [
    DragulleryComponent
  ]
})
export class DragulleryModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DragulleryModule,
      providers: [DragulleryService]
    };
  }
}
