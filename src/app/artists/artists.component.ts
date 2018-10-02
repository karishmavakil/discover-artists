import { Component, OnInit } from '@angular/core';
import { Artist } from '../artist';
import { ARTISTS }  from '../mock-artists';
import { ArtistService }  from '../artist.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {


  artist: Artist = {
    id: 1,
    name: 'Drake',
    genre: 'Rap'

  };

  artists: Artist[];

  constructor(private artistService: ArtistService) { }

  ngOnInit() {
    this.getArtists();
  }

  getArtists(): void {
    this.artistService.getArtists().subscribe(artists => this.artists = artists);
  }

  add(name: string, genre: string): void {
    name = name.trim();
    genre = genre.trim();
    if (!name || !genre) { return; }
    this.artistService.addArtist( {name, genre} as Artist)
      .subscribe(artist => {
        this.artists.push(artist);
    });
  }

  delete(artist: Artist): void {
    this.artists = this.artists.filter(a => a !== artist);
    this.artistService.deleteArtist(artist).subscribe();
  }
}
