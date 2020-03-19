import { FilterPipe } from 'app/core/pipe/filter/filter.pipe';

describe('Filter pipe',()=>{
    let pipe=new FilterPipe();
    let items;
    let filterField;

    describe('When items are empty', () => {
        it('should return empty array', () => {
            const items = [];
            const result = pipe.transform(items, 'angular');
            expect(result).toEqual(items);
        });
    });

    describe('when items are strings',()=>{
        beforeEach(()=>{
            items = ['karma', 'angular', 'react', 'filter', 'REACT'];
        });

        it('should return all elements when searchText is empty', () => {
            const result = pipe.transform(items, undefined);
            expect(result).toEqual(items);
        });

        it('should return the filtered data', () => {
            const result = pipe.transform(items, 'angular');
            expect(result).toEqual(['angular']);
        });
    
        it('should be case insensitive', () => {
            const result = pipe.transform(items, 'react');
            expect(result.length).toBe(2);
        });
    });

    describe('when items are objects',()=>{
        beforeEach(()=>{
            items = [
                    { 'name': 'angular','value':'2' },
                    { 'name': 'karma' ,'value':'3'},
                    { 'name': 'jasmine','value':'5' },
                    { 'name': 'KARMA','value':'3' },
                    { 'name': 'jest' ,'value':'2'}
                    ];
            filterField ='name';
        });

        it('should filter array of objects', () => {
            const result = pipe.transform(items, 'jasmine', filterField);
            expect(result.length).toBe(1);
            expect(result[0]).toEqual(items[2]);
        });

        it('should be case insensitive', () => {
            const result = pipe.transform(items, 'KARMA',filterField);
            expect(result.length).toBe(2);
        });

        it('should return empty when searchtext is not matched',()=>{
            const result = pipe.transform(items, 'test',filterField);
            expect(result.length).toBe(0);
        });
    });

})

