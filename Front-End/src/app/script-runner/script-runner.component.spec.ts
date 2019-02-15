import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScriptRunnerComponent } from './script-runner.component';

describe('ScriptRunnerComponent', () => {
  let component: ScriptRunnerComponent;
  let fixture: ComponentFixture<ScriptRunnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScriptRunnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScriptRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
