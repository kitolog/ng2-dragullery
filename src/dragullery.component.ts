import {Component, Input} from '@angular/core';

@Component({
  selector: 'dragullery',
  // styleUrls: ['./dragullery.component.css'],
  // templateUrl: './dragullery.component.html',
  styles: [`
      .dragullery{
        width: 100%;
      }
    /*.dragullery .item {*/
      /*width: 200px;*/
      /*height: 100px;*/
      /*!*width: 100%;*!*/
      /*!*height: 100%;*!*/
      /*display: inline-block;*/
      /*background-repeat: no-repeat;*/
      /*background-size: contain;*/
    /*}*/
     
     .dragullery .item {
         display: inline-block;
    }
    
    .dragullery .item .image {
      max-height: 100px;
      float:left;
    }
  `],
  template: `
      <!--<md-grid-list class="dragullery" cols="4" rowHeight="100px">-->
      <div class="dragullery"  [dragula]='"bag-one"'>
      <div class="item"
          *ngFor="let image of imagesList">
        <!--<md-grid-tile-->
            <!--[dragula]='"bag-one"'-->
            <!--*ngFor="let image of imagesList">-->
          <!--<span-->
            <!--class="item"-->
            <!--title="{{image.Description}}"-->
            <!--[style.background-image]="'url('+image.Url+')'"-->
          <!--&gt;</span>-->
          <img src="{{image.Url}}" class="image"/>
        <!--</md-grid-tile>-->
        </div>
        </div>
      <!--</md-grid-list>-->
`
})
export class DragulleryComponent {

  @Input() imagesList: any[];

  constructor() {
  }

}
