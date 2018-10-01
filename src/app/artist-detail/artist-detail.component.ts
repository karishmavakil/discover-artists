import { Component, OnInit, Input } from '@angular/core';
import { Artist } from '../artist';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ArtistService } from '../artist.service';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css']
})
export class ArtistDetailComponent implements OnInit {

  @Input() artist : Artist;

  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getArtist();
  }

  getArtist(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.artistService.getArtist(id)
      .subscribe(artist => this.artist = artist);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.artistService.updateArtist(this.artist)
    .subscribe(() => this.goBack());
  }


}
