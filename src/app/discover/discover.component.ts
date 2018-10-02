import { Component, OnInit } from '@angular/core';
import { iTunesArtist } from '../itunesArtist';
import { SearchArtistResponse } from '../searchArtistResponse';
import { LookupArtistResponse } from '../lookupArtistResponse';
import { ITunesService } from '../i-tunes.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {


  itunesartist: iTunesArtist;

  constructor(private iTunesService: ITunesService) { }

  ngOnInit() {
  }

  searchiTunesArtist(artistName: string): void {

    this.iTunesService.searchiTunesArtist(artistName.trim().split(' ').join('+'))
    .subscribe(searchArtistResponse => {
      console.log(searchArtistResponse.resultCount);
      console.log(searchArtistResponse.results[0].artistId);
      this.lookupiTunesArtist(searchArtistResponse.results[0].artistId);
    });
  }


  lookupiTunesArtist(id : number): void {

    this.iTunesService.lookupiTunesArtist(id)
    .subscribe(lookupArtistResponse => {
      console.log(lookupArtistResponse.results[0].artistName);
      this.itunesartist = lookupArtistResponse.results[0];
      }
    });
  }

}
