import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HitorialasisPage } from './hitorialasis.page';

describe('HitorialasisPage', () => {
  let component: HitorialasisPage;
  let fixture: ComponentFixture<HitorialasisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HitorialasisPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HitorialasisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
