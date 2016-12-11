import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GeocodeService {
  data: any;
  apikey:String = 'AIzaSyBCGR0o1N1TZiDFJHhkvQq7gKo7acgX1TE';
  constructor(public http: Http) {
    this.data = null;
  }

  getLatLong(address:string) {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+encodeURIComponent(address)+'&key='+this.apikey)
        .map(res => res.json())
        .subscribe(data => {
            if(data.status === "OK") {
                resolve({name: data.results[0].formatted_address, location:{
                    latitude: data.results[0].geometry.location.lat,
                    longitude: data.results[0].geometry.location.lng
                }});
            } else {
                console.log(data);
                //reject
            }
        });
    });
  }
}

