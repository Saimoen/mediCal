import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() public user!: User | null;
  @Output() public logout: EventEmitter<true> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
