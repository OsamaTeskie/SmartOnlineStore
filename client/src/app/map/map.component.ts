import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  userAddress:any;
  @ViewChild('mapContainer', {static: false}) mapContainer!: ElementRef;
  map!: google.maps.Map;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    fetch("https://localhost/630/address.php?client="+localStorage.getItem("token"),
    {
      method: "GET",
      mode: "cors",
    })
    .then((response) => response.json())
    .then((data) => {
      this.userAddress = JSON.parse(JSON.stringify(data))[0];
      console.log(this.userAddress);
      this.initMap(this.userAddress);
    });
  }

  initMap(address:any) {
    const geocoder = new google.maps.Geocoder();
    if (address != '') {
      geocoder.geocode( { 'address': address}, (results:any, status:any) => {
        if (status == 'OK') {
          const coordinates = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
          const mapOptions: google.maps.MapOptions = {
            center: coordinates,
            zoom: 12
          };
          this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
  
          const markerOptions: google.maps.MarkerOptions = {
            position: coordinates,
            map: this.map,
            title: 'User Address',
            icon: {
              url: '../assets/image/truck.png',
              scaledSize: new google.maps.Size(32, 32)
            }
          };
          const marker = new google.maps.Marker(markerOptions);
        
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
          const coordinates = new google.maps.LatLng(32,42);
          const markerOptions: google.maps.MarkerOptions = {
            position: coordinates,
            map: this.map,
            title: 'User Address',
            icon: {
              url: '../assets/image/truck.png',
              scaledSize: new google.maps.Size(32, 32)
            }
          };
          const marker = new google.maps.Marker(markerOptions);
            }
      });
    } else {
      const coordinates = new google.maps.LatLng(32,42);
      const markerOptions: google.maps.MarkerOptions = {
        position: coordinates,
        map: this.map,
        title: 'User Address',
        icon: {
          url: '../assets/image/truck.png',
          scaledSize: new google.maps.Size(32, 32)
        }
      };
      const marker = new google.maps.Marker(markerOptions);
      console.log('no string')
    }
  }
}
