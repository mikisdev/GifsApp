import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
})
export class LazyImageComponent implements OnInit {

  @Input()
  public url!: string

  @Input()
  public alt: string = ''

  hasLoader: boolean = false

  onload(): void{
    setTimeout(() => {
      this.hasLoader = true
    }, 500);
  }


  ngOnInit(): void {
    if(!this.url) throw new Error('URL property is required');
  }

}
