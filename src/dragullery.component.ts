import {Component, Input} from '@angular/core';

@Component({
  selector: 'dragullery',
  styles: [
    `.gu-mirror {
        position: fixed !important;
        margin: 0 !important;
        z-index: 9999 !important;
        opacity: 0.8;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=80)";
        filter: alpha(opacity=80);
      }
      .gu-hide {
        display: none !important;
      }
      .gu-unselectable {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
      }
      .gu-transit {
        opacity: 0.2;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=20)";
        filter: alpha(opacity=20);
      }
      .dragullery{
        width: 100%;
      }
      .dragullery-item {
         display: inline-block;
      }
      .dragullery-item .image {
        max-height: 100px;
        float:left;
      }
  `],
  template: `
      <div class="dragullery" [dragula]='"bag-one"'>
        <div class="dragullery-item"
          *ngFor="let image of sortedList">
          <img src="{{image.Url}}" class="image" title="{{image.Description}}" alt="{{image.Description}}"/>
        </div>
      </div>
`
})
export class DragulleryComponent {

  @Input() imagesList: any[];
  protected previousList: any[];
  protected sortedList: any[] = [];

  constructor() {
  }

  ngOnInit() {
    this.orderImages();
  }

  ngDoCheck() {
    this.orderImages();
  }

  orderImages(): void {
    this.previousList = this.imagesList;
    if (this.imagesList && (this.imagesList.length > 0)) {
      this.sortedList = this.imagesList.sort((item1:any, item2:any) => {
        if (item1 && item1.hasOwnProperty('Position') && item2 && item2.hasOwnProperty('Position')) {
          if (item1.Position > item2.Position) {
            return 1;
          } else if (item1.Position < item2.Position) {
            return -1;
          }
        }

        return 0;
      });
    }
  }
}
