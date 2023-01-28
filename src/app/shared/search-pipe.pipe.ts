import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe',
})
export class SearchPipePipe implements PipeTransform {
  transform(value: any[], searchText: any): any {
    
    let result = []

    if (value.length === 0 || searchText === '') {
      return value
    }
    searchText = searchText.toLowerCase()

    // return value.filter(item =>{
    //   return item.email.toLowerCase().includes(searchText)
    // })



    for (let item of value){
      if(item.name.toLowerCase().includes(searchText) || item.email.toLowerCase().includes(searchText) || item.role.toLowerCase().includes(searchText)){
        result.push(item)
      }
    }

    return result
  }
}
