import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NuevoasuetoPage } from './nuevoasueto.page';

describe('NuevoasuetoPage', () => {
  let component: NuevoasuetoPage;
  let fixture: ComponentFixture<NuevoasuetoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoasuetoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NuevoasuetoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
