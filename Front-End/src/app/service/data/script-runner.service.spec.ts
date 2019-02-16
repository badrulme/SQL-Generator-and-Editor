import { TestBed } from '@angular/core/testing';

import { ScriptRunnerService } from './script-runner.service';

describe('ScriptRunnerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScriptRunnerService = TestBed.get(ScriptRunnerService);
    expect(service).toBeTruthy();
  });
});
