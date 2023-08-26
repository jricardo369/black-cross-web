import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerproductoPage } from './verproducto.page';

describe('VerproductoPage', () => {
  let component: VerproductoPage;
  let fixture: ComponentFixture<VerproductoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerproductoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerproductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
