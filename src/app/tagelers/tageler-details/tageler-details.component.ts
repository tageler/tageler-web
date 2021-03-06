import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { Tageler } from '../tageler';
import { TagelerService } from '../tageler.service';
import { Params, ActivatedRoute } from '@angular/router';
import { GroupService } from "../../groups/group.service";
import { Group } from '../../groups/group';

@Component({
  selector: 'tageler-details',
  templateUrl: './tageler-details.component.html',
  styleUrls: ['./tageler-details.component.css'],
})

export class TagelerDetailsComponent implements OnInit {
  @Input()
  tageler: Tageler;
  text: String;

  constructor(
    private tagelerService: TagelerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log("Init Details");
    this.route.params
      .switchMap((params: Params) => this.tagelerService.getTageler(params['id']))
      .subscribe(tageler => this.tageler = tageler);
  };

  /*
   * iCal
   */

  // downloads this tageler as iCal
  handleICal(tageler: Tageler) {
    this.tageler = tageler;
    let link = this.tagelerService.iCalForTageler(this.tageler);
    window.location.href=link;
  }
}
