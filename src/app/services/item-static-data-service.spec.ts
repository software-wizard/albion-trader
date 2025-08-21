import {TestBed} from '@angular/core/testing';
import {AlbionItemsService} from './item-static-data-service';

import * as itemsData from '../../assets/items.json';
import {AlbionStaticData} from "../../assets/albion-static-data";

describe('AlbionItemsService (real data)', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlbionItemsService]
    });
  });

  // it('should load and log first 3 equipment items', (done) => {
  //   const data = itemsData as unknown as AlbionStaticData;
  //   console.log(data.weapon[0].uniquename);
  //   console.log(data.weapon[10].uniquename);
  //   console.log(data.weapon[100].uniquename);
  //   console.log(data.weapon[300].uniquename);
  // });
});
