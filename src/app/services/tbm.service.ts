import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Partner} from '../models/partner';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TbmService {

  partners: Partner[] = [
    {
      name: 'Mohamed Laroussi',
      job: 'Directeur de course',
      // tslint:disable-next-line:max-line-length
      description: '34 ans, Préparateur mental et enseignant d’éducation physique, ultra trailer depuis 4 ans et membre fondateur du running club Tunis.'
    },
    {
      name: 'Heifa Bouslama',
      job: 'Directrice adjointe',
      // tslint:disable-next-line:max-line-length
      description: '38 ans, Enseignante universitaire, coach en course à pied et ex présidente de running club tunis, ultra traileuse depuis 4 ans.'
    },
    {
      name: 'Khaled Stiti',
      job: 'Responsable parcours',
      // tslint:disable-next-line:max-line-length
      description: '31 ans, architecte, ultra trailer ayant participé deux fois au sommet mondial du trail.'
    },
    {
      name: 'Hafedh Dridi',
      job: 'Responsable de communication',
      // tslint:disable-next-line:max-line-length
      description: '35 ans, expert en communication stratégique, ultratrailer et coureur de fond.'
    },
    {
      name: 'Aymen Bouaben',
      job: 'Responsable médias & Relations publiques',
      // tslint:disable-next-line:max-line-length
      description: '35 ans, Communication manager, triathlète et ultratrailer.'
    },
    {
      name: 'Marwen Trabelsi',
      job: 'Responsable inscription & Actions sur le web',
      // tslint:disable-next-line:max-line-length
      description: '30 ans, Ingénieur en génie logiciels, marathonien et ultratraile.'
    },
    {
      name: 'Ali Mnif',
      job: 'Responsable Sponsoring',
      // tslint:disable-next-line:max-line-length
      description: '33 ans, consultant international, marathonien et trailer.'
    },
    {
      name: 'Nizar Bouraoui',
      job: 'Responsable de la sécurité du parcours',
      // tslint:disable-next-line:max-line-length
      description: '36 ans, Fonctionnaire à l’ambassade d’allemagne, ultratrailer et marathonien.'
    },
    {
      name: 'Med Hedi Nehdi',
      job: 'Responsable ravitaillement',
      // tslint:disable-next-line:max-line-length
      description: '28 ans, étudiant et ultratrailer.'
    },
    {
      name: 'Ahmed El Fehem',
      job: 'Responsable bénévoles',
      // tslint:disable-next-line:max-line-length
      description: '33 ans, entrepreneur, membre actif de la société civile, coureur depuis 8 ans, trailer et triathlète.'
    },
    {
      name: 'Idriss Bouguerra',
      job: 'En charge de la communication avec les communautés des coureurs',
      // tslint:disable-next-line:max-line-length
      description: ''
    }
  ];

  constructor(private http: HttpClient) { }

  private static handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }

  public submitSubscriptionForm(body: any) {
    return this.http.post(environment.backendUrl + '/inscriptions', JSON.stringify(body))
      .toPromise().catch(TbmService.handleError);
  }

  public getMedia(): Promise<any> {
    return this.http.get(environment.backendUrl + '/media')
      .toPromise().catch(TbmService.handleError);
  }

  public getSponsors(): Promise<any> {
    return this.http.get(environment.backendUrl + '/sponsors')
      .toPromise().catch(TbmService.handleError);
  }

  public getPartners(): Promise<any> {
    return of(this.partners)
      .toPromise().catch(TbmService.handleError);
  }

  public submitVolunteerForm(body: any) {
    return this.http.post(environment.backendUrl + '/volunteers', JSON.stringify(body))
      .toPromise().catch(TbmService.handleError);
  }

}
