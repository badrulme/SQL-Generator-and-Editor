import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlGenComponent } from './sql-gen.component';

describe('SqlGenComponent', () => {
  let component: SqlGenComponent;
  let fixture: ComponentFixture<SqlGenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SqlGenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SqlGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
