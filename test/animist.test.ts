import Animist from '../src/animist'

const animist = new Animist(process.env.ID, process.env.SECRET);

describe('animist tests', () => {
  it('get anime', done => {
    animist.get('browse/anime', {
      airing_data: true,
      full_page: true,
      season: 'winter',
      sort: 'popularity-desc',
      status: 'finished airing',
      type: 'TV',
    }).then(data => {
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);

      done();
    }).catch(console.log)
  });

  it('get manga', done => {
    animist.get('browse/manga', {
      type: 'Manga',
      full_page: true,
      status: 'finished publishing',
    }).then(data => {
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);

      done();
    }).catch(console.log)
  });
});
