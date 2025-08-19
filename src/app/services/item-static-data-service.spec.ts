import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import {AlbionItemsService} from "./item-static-data-service";

describe('AlbionItemsService (real data)', () => {
  let service: AlbionItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AlbionItemsService],
    });

    service = TestBed.inject(AlbionItemsService);
  });

  it('should load and log first 3 equipment items', (done) => {
    service.loadItems().subscribe(items => {
      console.log(items.weapon[0].uniquename)
      console.log(items.weapon[10].uniquename)
      console.log(items.weapon[20].uniquename)
      console.log(items.weapon[50].uniquename)
      done();
    });
  });
});
