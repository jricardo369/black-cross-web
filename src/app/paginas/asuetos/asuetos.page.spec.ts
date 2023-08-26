import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AsuetosPage } from './asuetos.page';

describe('AsuetosPage', () => {
  let component: AsuetosPage;
  let fixture: ComponentFixture<AsuetosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsuetosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AsuetosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
