import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent implements OnInit {
  member!: Member;
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  constructor(
    private membersService: MembersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.membersService
      .getMember(this.getUsername())
      .subscribe((member) => (this.member = member));
  }

  getUsername() {
    return this.route.snapshot.paramMap.get('username') || '';
  }
}
