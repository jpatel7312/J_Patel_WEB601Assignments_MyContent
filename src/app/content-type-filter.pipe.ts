import { Pipe, PipeTransform } from '@angular/core';
import {Content} from '../helper-files/content-interface'

@Pipe({
  name: 'contentTypeFilter'
})
export class ContentTypeFilterPipe implements PipeTransform {

  transform(contents: Content[], contentType?: string): Content[] {
    if (!contents) {
        return contents;
    }
    
    return contents.filter(content=>contentType?content.type === contentType:!content.type)
  }

}
