import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MainpageService {

  pageId:any;
  constructor(private http: HttpClient) { }

  getNavbar(): Observable<any> {
    return this.http.get(`${environment.strapiUrl}/api/header-menu?populate=HeaderMenus.HeaderLinks`).pipe(
      map((res: any) => {
        // console.log('service header: ', res.data);
        return res.data;
      }),
    );
  }

  getHeaders(): Observable<any> {
    return this.http.get(`${environment.strapiUrl}/api/header-navigations?populate=*`).pipe(
      map((res: any) => {
        // console.log('service header: ', res.data);

        return res.data;
      }),
    );
  }

  getHeaderLinks(): Observable<any> {
    return this.http.get(`${environment.strapiUrl}/api/header-menu?populate=HeaderMenus.HeaderLinks&populate=HeaderMenus.HeaderLinks.page`).pipe(
      map((res: any) => {
        // console.log('service headerlinks: ', res.data);
        return res.data;
      }),
    );
  }

//   getPageData(pageId: any): Observable<any> {
//     console.log('pageId', pageId);
//     const url = `${environment.strapiUrl}/api/pages/${pageId}`;
// console.log('url',url);
//     return this.http.get<any>(url);
//   }
  // this.mainPageData.getPageData(id)


  getTopBanner(pageId: any): Observable<any> {
    //   /api/pages?populate=Banner.Image
    return this.http.get(`${environment.strapiUrl}/api/pages/${pageId}/?populate=Contents.Contents.Image&populate=Banner.Image&populate=Contents.Cards.IconImage`).pipe(
      map((res: any) => {
        console.log('service - getTopBanner: ', res.data);
        // `${environment.strapiUrl}`+res.data[0].attributes.Banner.Image.data.attributes.url
        return res.data;
      }),
      // map((images: any) => {
      //    console.log('imm:', images);
      //   // return images.map((img: any) => {
      //   // attributes.Banner.Image.data.attributes.url

      //     images.attributes.Banner.Image.data.attributes.url = `${environment.strapiUrl}${images.attributes.Banner.Image.data.attributes.url}`
      //    console.log('images', images);
      //     return images;
      //   //  console.log('top img', images);
      //   // })
      // })
    );
  }

  getMainPage(): Observable<any> {
    return this.http.get(`${environment.strapiUrl}/api/pages?populate=*`).pipe(
      map((res: any) => {
        // console.log('service pages: ', res.data);
        return res.data;
      }),
      // map((images: any) => {
      //   return images.map((img: any) => {
      //     img.attributes.image.data.attributes.url = `${environment.strapiUrl}${img.attributes.image.data.attributes.url}`
      //     return img;
      //   })
      // })
    );
  }


  getGoSolarPage(): Observable<any> {
    //   /api/pages?populate=Banner.Image
    return this.http.get(`${environment.strapiUrl}/api/pages/2/?populate=Contents.Contents.Image&populate=Banner.Image`).pipe(
      map((res: any) => {
        // console.log('service getTopBanner: ', res.data );
        // `${environment.strapiUrl}`+res.data[0].attributes.Banner.Image.data.attributes.url
        return res.data;
      }),
      map((images: any) => {
        //  console.log('imm:', images);

        // return images.map((img: any) => {
        // attributes.Banner.Image.data.attributes.url
        images.attributes.Banner.Image.data.attributes.url = `${environment.strapiUrl}${images.attributes.Banner.Image.data.attributes.url}`
        //  console.log('top img', images);
        return images;
        // })
      })
    );
  }




}
