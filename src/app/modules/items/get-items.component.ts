import { Component, OnInit } from '@angular/core';

// services
import { KCloudService } from '../../kentico-cloud/services/kcloud.service';

// models
import { CodeExample } from '../../models/code-example.class';
import { Character } from '../../models/character.class';
import { LimitParameter, OrderAscParameter, OrderDescParameter, DepthParameter,
   ElementsParameter, SkipParameter } from '../../kentico-cloud/models/parameters';
import { EqualsFilter, AllFilter, AnyFilter, ContainsFilter, GreaterThanFilter,
   GreaterThanOrEqualFilter, Infilter, LessThanFilter, LessThanOrEqualFilter,
    RangeFilter } from '../../kentico-cloud/models/filters';

@Component({
  templateUrl: 'get-items.component.html',
})
export class GetItemsComponent implements OnInit {

  private readonly type = "code_example";

  private codeExamples: CodeExample[];
  private codeExample: CodeExample;
  private characters: Character[];

  constructor(
    private kCloudService: KCloudService,
  ) {
  }

  ngOnInit(): void {

    this.kCloudService.getItems<Character>('character', [
      new RangeFilter("elements.somenumber", 1, 20)
    ])
      .subscribe(response => {
        console.log(response);
        console.log(response.items[0].someDateTime.datetime);
        this.characters = response.items;
      });

    this.kCloudService.getItems<CodeExample>(this.type, [
      new LimitParameter(5),
      // new SkipParameter(1),
      // new DepthParameter(5),
      // new ElementsParameter(["title", "author", "category", "image", "name", "category_name"]),
      // new OrderDescParameter("elements.title")
      // new EqualsFilter("elements.title", "Rick")
    ]).subscribe(response => {
      console.log(response);
      this.codeExamples = response.items;
    });

    this.kCloudService.getItemByCodename<CodeExample>(this.type, 'changemacrorule_parameters').subscribe(response => {
      console.log(response);
      this.codeExample = response.item;
    });
  }
}