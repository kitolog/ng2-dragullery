import {NgModule, ModuleWithProviders} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DragulleryComponent} from "./src/dragullery.component";
import {DragulleryDirective} from "./src/dragullery.directive";
import {DragulleryPipe} from "./src/dragullery.pipe";
import {DragulleryService} from "./src/dragullery.service";
import {DragulaModule} from "ng2-dragula";
import {MdGridListModule} from "@angular/material";

export * from './src/dragullery.component';
export * from './src/dragullery.directive';
export * from './src/dragullery.pipe';
export * from './src/dragullery.service';

@NgModule({
  imports: [
    CommonModule,
    DragulaModule,
    MdGridListModule
  ],
  declarations: [
    DragulleryComponent,
    DragulleryDirective,
    DragulleryPipe
  ],
  exports: [
    DragulleryComponent,
    DragulleryDirective,
    DragulleryPipe
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
