import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Artist } from './artist';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const artists: Artist[] = [
      { id: 11, name: 'Mr. Nice' , genre: 'Pop'},
      { id: 12, name: 'Narco' , genre: 'Rock'},
      { id: 13, name: 'Bombasto' , genre: 'Pop'},
      { id: 14, name: 'Celeritas' , genre: 'Pop'},
      { id: 15, name: 'Magneta' , genre: 'Country'},
      { id: 16, name: 'RubberMan' , genre: 'Country'},
      { id: 17, name: 'Dynama' , genre: 'Country'},
      { id: 18, name: 'Dr IQ' , genre: 'Pop'},
      { id: 19, name: 'Magma' , genre: 'R & B'},
      { id: 20, name: 'Tornado' , genre: 'R & B'}
    ];
    return {artists};
  }

  // Overrides the genId method to ensure that a artist always has an id.
  // If the artists array is empty,
  // the method below returns the initial number (11).
  // if the artists array is not empty, the method below returns the highest
  // artist id + 1.
  genId(artists: Artist[]): number {
    return artists.length > 0 ? Math.max(...artists.map(artist => artist.id)) + 1 : 11;
  }
}
