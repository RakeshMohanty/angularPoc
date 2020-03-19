import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], searchText: string, filterField?: string): any[] {
        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }

        if (typeof searchText === 'string') {
            searchText = searchText.toLowerCase();
        }

        return filterField
            ? items.filter(
                  item =>
                      item[filterField].toLowerCase().indexOf(searchText) !== -1
              )
            : items.filter(
                  item => item.toLowerCase().indexOf(searchText) !== -1
              );
    }
}
