# angular2-dragullery

## Installation

To install this library, run:

```bash
$ npm install https://github.com/kitolog/ng2-dragullery.git --save
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { DragulleryModule } from 'ng2-dragullery';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify your library as an import
    DragulleryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its components, directives and pipes in your Angular application:

```typescript
this.imagesList = [
      {
        Url: 'url-to-image',
        Description: 'Description',
        Position: 1
      }
    ]
```

```xml
<!-- You can now use your library component in app.component.html -->
<dragullery [imagesList]="imagesList"></dragullery>
OR
<dragullery [imagesList]="imagesList" [imageStyle]="{'max-height':'50px'}"></dragullery>
```

### Angular material styles
 - Add Angular Material icons font link to index.html
```xml
<!-- Add Angular Material icons font -->
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```
 - Import Angular Material styles in your styles.scss
```scss
@import '~@angular/material/core/theming/prebuilt/deeppurple-amber.css';
```

## API
 - ```[imagesList]``` an array of Image models (Url,Description,Position)
 - ```[imageStyle]``` styles for image
 - ```[wrapperStyle]``` styles for image wrapper
 - ```[galleryStyle]``` styles for gallery container
## Development

To generate all `*.js`, `*.js.map` and `*.d.ts` files:

```bash
$ npm run tsc
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [kitolog](mailto:nikita.kosilo@gmail.com)
