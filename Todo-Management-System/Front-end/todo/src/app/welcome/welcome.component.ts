import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  name = '';

  // ActivatedRoute
  constructor(private route : ActivatedRoute) { }

  ngOnInit(): void {

  //  console.log();
   this.name = this.route.snapshot.params['name'];
  }

}
