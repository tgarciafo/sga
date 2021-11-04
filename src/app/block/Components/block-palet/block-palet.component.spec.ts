import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockPaletComponent } from './block-palet.component';

describe('BlockPaletComponent', () => {
  let component: BlockPaletComponent;
  let fixture: ComponentFixture<BlockPaletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockPaletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockPaletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
