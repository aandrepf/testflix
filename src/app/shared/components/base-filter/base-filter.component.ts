import { TestFlixFilters } from './../../../pages/main/models/TestFlixFilter';
import { Observable } from 'rxjs';
import {
  Component,
  OnInit,
  OnChanges,
  Input,
  ViewChildren,
  QueryList,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { Facets } from '../../../pages/main/models/TestFlix';

@Component({
  selector: 'mono-nx-test-with-nextjs-base-filter',
  templateUrl: './base-filter.component.html',
  styleUrls: ['./base-filter.component.scss'],
})
export class BaseFilterComponent implements OnChanges {
  @Input() movieFilter: Observable<Facets> = null;
  @Input() actorFilter: Observable<Facets> = null;
  @Input() directorFilter: Observable<Facets> = null;
  @Input() resetFilter = true;
  @Output() resetBase: EventEmitter<boolean> = new EventEmitter();
  @Output() sendFilter: EventEmitter<TestFlixFilters> = new EventEmitter();

  @ViewChildren('listInputs') uls: QueryList<ElementRef>;
  @ViewChild('listDefaultInputs') ulDefault: ElementRef;
  @ViewChildren('filterRadios') radios: QueryList<ElementRef>;
  @ViewChildren('filterChecks') checks: QueryList<ElementRef>;
  @ViewChildren('seeMoreButton')
  seeMoreBtn: QueryList<ElementRef>;

  testFlixFilter = new TestFlixFilters([], [], [], [], [], [], '', '');
  isSeeMore = true;
  ulSelected;
  metascores: number[] = [0, 60, 80, 90];

  constructor() {}

  ngOnChanges() {
    if (this.resetFilter) {
      this.resetFilterInputs();
    }
  }

  seeMore(btn: HTMLElement, index: number) {
    if (btn.textContent.includes('less')) {
      this.seeLess(index, null);
      this.changeBtnSeeMore(btn);
      return;
    }

    if (this.verifyUlListElements(index, null) === 1) {
      this.isSeeMore = !this.isSeeMore;
      this.changeBtnSeeMore(btn);
    }
  }

  seeMoreDefault(btn: HTMLElement) {
    if (btn.textContent.includes('less')) {
      this.seeLess(null, this.ulDefault.nativeElement);
      this.changeBtnSeeMore(btn);
      return;
    }

    if (this.verifyUlListElements(null, this.ulDefault.nativeElement) < 3) {
      this.isSeeMore = !this.isSeeMore;
      this.changeBtnSeeMore(btn);
    }
  }

  radioSelection(checked, value, type) {
    switch (type) {
      case 'saved in wishlist':
        this.testFlixFilter.saved = value === 'Yes' ? 'true' : 'false';
        break;
      default:
        this.testFlixFilter[type] = value === 'Yes' ? 'true' : 'false';
        break;
    }
    this.verifyFilter();
  }

  checkboxSelection(checked, value, type) {
    let tipo;
    switch (type) {
      case 'years':
      case 'actors':
      case 'directors':
        tipo = type.substring(0, type.length - 1);
        break;
      case 'saved in wishlist':
        tipo = 'saved';
        break;
      case 'metascore':
        tipo = 'metascore';
        value = this.metascoreLevels(value);
        break;
      default:
        tipo = type;
        break;
    }
    if (checked) {
      this.testFlixFilter[tipo].push(value);
    } else {
      const t = Array.from(this.testFlixFilter[tipo]);
      this.testFlixFilter[tipo] = t.filter((v) => {
        if (v !== value) return v;
      });
    }
    this.verifyFilter();
  }

  metascoreLevels(level: string) {
    switch (level) {
      case '< 60':
      case 'N/A':
        return '0';
      case 'Between 60 & 80':
        return '1';
      case 'Between 80 & 90':
        return '2';
      case '> 90':
        return '3';
    }
  }

  verifyFilter() {
    this.sendFilter.emit(this.testFlixFilter);
  }

  private resetFilterInputs() {
    this.checks.forEach((check) => {
      (check.nativeElement as HTMLInputElement).checked = false;
    });
    this.radios.forEach((radio) => {
      (radio.nativeElement as HTMLInputElement).checked = false;
    });
    this.testFlixFilter = new TestFlixFilters([], [], [], [], [], [], '', '');
    this.verifyFilter();
    setTimeout(() => {
      this.resetBase.emit(false);
    }, 300);
  }

  private seeLess(index, ulElement) {
    this.isSeeMore = !this.isSeeMore;
    if (ulElement) {
      this.ulSelected = ulElement as HTMLElement;
    } else {
      this.ulSelected = this.uls.filter((u, i) => {
        if (i === index) return u.nativeElement;
      })[0].nativeElement as HTMLElement;
    }

    const lis = Array.from(this.ulSelected.children);

    lis.forEach((l: Element, i) => {
      if (i > 1) l.classList.toggle('not-see-li');
    });
  }

  private verifyUlListElements(index: number, ulElement) {
    if (ulElement) {
      this.ulSelected = ulElement as HTMLElement;
    } else {
      this.ulSelected = this.uls.filter((u, i) => {
        if (i === index) return u.nativeElement;
      })[0].nativeElement as HTMLElement;
    }

    const lis = Array.from(this.ulSelected.children);
    const lisNone = lis.filter((li: Element) =>
      li.classList.contains('not-see-li')
    );

    lisNone.slice(0, 2).forEach((li: Element) => {
      li.classList.toggle('not-see-li');
    });

    return lisNone.length;
  }

  private changeBtnSeeMore(btn: HTMLElement) {
    btn.innerHTML = this.isSeeMore
      ? `<i class="fa fa-angle-down" aria-hidden="true"></i> See more`
      : `<i class="fa fa-angle-up" aria-hidden="true"></i> See less`;
  }
}
