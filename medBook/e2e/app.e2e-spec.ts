import { MedBookPage } from './app.po';

describe('med-book App', function() {
  let page: MedBookPage;

  beforeEach(() => {
    page = new MedBookPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
