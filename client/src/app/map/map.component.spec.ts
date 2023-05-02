import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @ViewChild('mapContainer', {static: false}) mapContainer!: ElementRef;
  map!: google.maps.Map;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.initMap();
  }

  initMap() {
    const coordinates = new google.maps.LatLng(37.7749, -122.4194);
    const mapOptions: google.maps.MapOptions = {
      center: coordinates,
      zoom: 12
    };
    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
  }

}