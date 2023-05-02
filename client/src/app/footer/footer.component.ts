import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  browserName = '';
  browserVersion = '';

  ngOnInit() {
    const userAgent = navigator.userAgent;
    let temp: string;
    if (userAgent.indexOf('Chrome') > -1) {
      temp = userAgent.substring(userAgent.indexOf('Chrome')).split(' ')[0];
      this.browserName = temp.split('/')[0];
      this.browserVersion = temp.split('/')[1];
    } else if (userAgent.indexOf('Firefox') > -1) {
      temp = userAgent.substring(userAgent.indexOf('Firefox')).split(' ')[0];
      this.browserName = temp.split('/')[0];
      this.browserVersion = temp.split('/')[1];
    } else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident/') > -1) {
      temp = userAgent.substring(userAgent.indexOf('MSIE')).split(' ')[0];
      this.browserName = 'Internet Explorer';
      this.browserVersion = temp.split('/')[1];
    } else if (userAgent.indexOf('Edge') > -1) {
      temp = userAgent.substring(userAgent.indexOf('Edge')).split(' ')[0];
      this.browserName = 'Microsoft Edge';
      this.browserVersion = temp.split('/')[1];
    } else if (userAgent.indexOf('Safari') > -1) {
      temp = userAgent.substring(userAgent.indexOf('Safari')).split(' ')[0];
      this.browserName = temp.split('/')[0];
      this.browserVersion = temp.split('/')[1];
    } else {
      this.browserName = 'Unknown';
      this.browserVersion = 'Unknown';
    }
  }
}
