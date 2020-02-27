import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  collapsed = true;
  // @Output() headerClicked = new EventEmitter<string>();

  ngOnInit() {
  }

  onHeaderClicked(name: string) {
    // this.headerClicked.emit(name);
  }
}
