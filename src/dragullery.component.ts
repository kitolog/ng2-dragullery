import {Component, Input} from '@angular/core';
import {DragulaService} from 'ng2-dragula';

@Component({
  selector: 'dragullery',
  styles: [
    `
    .gu-mirror {
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
      
      .button{
        display: none;
      }
      
      @media (max-width: 768px) {
        .dragullery-item .image {
          max-height: inherit!important;
          width: 100%;
        }
        
        .dragullery-item {
          position: relative;
        }
          
        .button{
          display: inline-block;
          position: absolute;
          right: 10px;
          
        }
        
        .button.up{
          top: 10px;
        }
        
        .button.down{
          bottom: 10px;
        }
      }
  `],
  template: `
      <div class="dragullery" [dragula]='"bag-one"' [ngStyle]="galleryStyle">
        <div class="dragullery-item"
         [ngStyle]="wrapperStyle"
          *ngFor="let image of sortedList">
          <img src="{{image.Url}}"
          [ngStyle]="imageStyle"
           [attr.uid]="image.Uid"
           class="image"
           title="{{image.Description}}" 
           alt="{{image.Description}}"/>
           <button (click)="moveUp(image.Uid)" class="button up" md-mini-fab><md-icon>keyboard_arrow_up</md-icon></button>
           <button (click)="moveDown(image.Uid)" class="button down" md-mini-fab><md-icon>keyboard_arrow_down</md-icon></button>
        </div>
      </div>
`,
  host: {
    '(window:resize)': 'onWindowResize($event)'
  }
})
export class DragulleryComponent {

  @Input() imagesList: any[];
  @Input() devMode: boolean = false;
  @Input() galleryStyle: any = null;
  @Input() wrapperStyle: any = null;
  @Input() imageStyle: any = null;

  protected sortedList: any[] = [];
  protected sortedMap: any = {};
  protected direction: string = 'vertical';
  protected innerWidth: any;

  constructor(private dragulaService: DragulaService) {
    this.innerWidth = (window.screen.width);
  }

  ngOnInit() {
    if (this.innerWidth > 768) {
      this.dragulaService.setOptions("bag-one", {direction: 'horizontal'});
      this.dragulaService.drop.subscribe((items: any[]) => {
        let newHTMLItems = items[2].children;
        this.recalculatePosition(newHTMLItems);
      });

      if (this.devMode) {
        console.log('DragulaService', this.dragulaService);
        this.dragulaService.drag.subscribe((value: any) => {
          this.onDrag(value.slice(1));
        });

        this.dragulaService.over.subscribe((value: any) => {
          this.onOver(value.slice(1));
        });
        this.dragulaService.out.subscribe((value: any) => {
          this.onOut(value.slice(1));
        });
      }
    }
    /**
     * @TODO: destroy dragulaService
     */
    this.orderImages();
  }

  onWindowResize(event: any) {
    this.innerWidth = event.target.innerWidth;
  }


  onDrag(e: any) {
    console.log('Dragullery drag', e);
  }

  onOver(e: any) {
    console.log('Dragullery over', e);
  }

  onOut(e: any) {
    console.log('Dragullery out', e);
  }

  ngDoCheck() {
    this.orderImages();
  }

  recalculatePosition(htmlItems: any[]) {
    for (let i = 0; i < htmlItems.length; i++) {
      let item: any = this.findByUid(htmlItems[i].children[0].getAttribute('uid'));
      if (this.devMode) {
        console.log('UID', htmlItems[i].children[0].getAttribute('uid'));
        console.log('Item', item);
      }
      if (item) {
        item.Position = i + 1;
      }
    }
  }

  moveUp(uid: string): void {
    if (this.sortedMap.hasOwnProperty(uid) && (this.sortedMap[uid] !== null) && (typeof this.sortedList[this.sortedMap[uid]] !== 'undefined') && this.sortedList[this.sortedMap[uid]]) {
      if ((this.sortedMap[uid] - 1 > -1) && this.sortedList[this.sortedMap[uid] - 1]) {
        let previous = this.sortedList[this.sortedMap[uid] - 1].Position;
        this.sortedList[this.sortedMap[uid] - 1].Position = this.sortedList[this.sortedMap[uid]].Position;
        this.sortedList[this.sortedMap[uid]].Position = previous;
      }
    }
  }

  moveDown(uid: string): void {
    if (this.sortedMap.hasOwnProperty(uid) && (this.sortedMap[uid] !== null) && (typeof this.sortedList[this.sortedMap[uid]] !== 'undefined') && this.sortedList[this.sortedMap[uid]]) {
      if ((this.sortedMap[uid] + 1 < this.sortedList.length - 1) && this.sortedList[this.sortedMap[uid] + 1]) {
        let previous = this.sortedList[this.sortedMap[uid] + 1].Position;
        this.sortedList[this.sortedMap[uid] + 1].Position = this.sortedList[this.sortedMap[uid]].Position;
        this.sortedList[this.sortedMap[uid]].Position = previous;
      }
    }
  }

  findByUid(uid: string): any {
    let result: any = null;
    if (this.sortedMap.hasOwnProperty(uid) && (this.sortedMap[uid] !== null) && (typeof this.sortedList[this.sortedMap[uid]] !== 'undefined') && this.sortedList[this.sortedMap[uid]]) {
      result = this.sortedList[this.sortedMap[uid]];
    }

    return result;
  }

  generateUid(): string {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  orderImages(): void {
    if (this.imagesList && (this.imagesList.length > 0)) {
      let resultList: any[] = [],
        sortedList = this.imagesList.sort((item1: any, item2: any) => {
          if (item1 && item1.hasOwnProperty('Position') && item2 && item2.hasOwnProperty('Position')) {
            if (item1.Position > item2.Position) {
              return 1;
            } else if (item1.Position < item2.Position) {
              return -1;
            }
          }

          return 0;
        });

      sortedList.map(item => {
        if (!item.hasOwnProperty('Uid') || !item.Uid) {
          item.Uid = this.generateUid();
        }

        this.sortedMap[item.Uid] = resultList.push(item) - 1;
      });

      this.sortedList = resultList;
    }
  }
}
