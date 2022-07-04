import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocketGameComponent } from './socket-game.component';

describe('SocketGameComponent', () => {
  let component: SocketGameComponent;
  let fixture: ComponentFixture<SocketGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocketGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocketGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
