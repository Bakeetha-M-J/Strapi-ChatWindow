import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from '../utils/dashboard-interface';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  getPages(): Observable<any> {
    return this.http.get(`${environment.strapiUrl}/api/pages`).pipe(
      map((res: any) => {
        // console.log('service pages: ', res);
        return res.data;
      })
    );
  }
  getContents(): Observable<any> {
    return this.http.get(`${environment.strapiUrl}/api/content-pages`).pipe(
      map((res: any) => {
        // console.log('service pages: ', res);
        return res.data;
      })
    );
  }

  getBlogs(): Observable<any> {
    return this.http.get(`${environment.strapiUrl}/api/blogs?populate=*`).pipe(
      map((res: any) => {
        // console.log('service blogs: ', res);
        return res.data;
      }),
      map((images: any) => {
        // attributes.Media.data.attributes.url;
        return images.map((img: any) => {
          img.attributes.Media.data.attributes.url = `${environment.strapiUrl}${img.attributes.Media.data.attributes.url}`
          return img;
        })
      })
    );
  }

  getGallery(): Observable<any> {
    return this.http.get(`${environment.strapiUrl}/api/new-roof-galleries`).pipe(
      map((res: any) => {
        // console.log('service new-roof-galleries: ', res);
        return res.data;
      })
    );
  }

  getLogo(): Observable<any> {
    return this.http.get(`${environment.strapiUrl}/api/logo`).pipe(
      map((res: any) => {
        // console.log('service logo: ', res);
        return res.data;
      })
    );
  }

  getPartner(): Observable<any> {
    return this.http.get(`${environment.strapiUrl}/api/partner`).pipe(
      map((res: any) => {
        // console.log('service partner: ', res);
        return res.data;
      })
    );
  }

  getTrust(): Observable<any> {
    return this.http.get(`${environment.strapiUrl}/api/trust`).pipe(
      map((res: any) => {
        // console.log('service trust: ', res);
        return res.data;
      })
    );
  }


  getLocalStrapi(): Observable<any> {
    return this.http.get(`${environment.strapiUrl}/api/products?populate=*`).pipe(
      map((res: any) => {
        console.log('service getLocalStrapi: ', res);
        return res.data;
      }),
      map((images: any) => {
        return images.map((img: any) => {
          // data[0].attributes.image.data.attributes.url
          img.attributes.image.data.attributes.url = `${environment.strapiUrl}${img.attributes.image.data.attributes.url}`
          return img;
        })
      })
    );
  }

}
