import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearpaquetePage } from './crearpaquete.page';

describe('CrearpaquetePage', () => {
  let component: CrearpaquetePage;
  let fixture: ComponentFixture<CrearpaquetePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearpaquetePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearpaquetePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
