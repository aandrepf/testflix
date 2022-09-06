import {
  animate,
  AUTO_STYLE,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
} from '@angular/core';
import LINKS from '../../../../common/links.json';
import { MainStateService } from './pages/main/service/main-state.service';
const { Instructions, Swagger, Design } = LINKS;

@Component({
  selector: 'mono-nx-test-with-nextjs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('expandCollapse', [
      state(
        'false',
        style({
          height: AUTO_STYLE,
          visibility: AUTO_STYLE,
          opacity: 1,
          padding: '15px 0',
        })
      ),
      state(
        'true',
        style({ height: '0', visibility: 'hidden', opacity: 0, padding: '0' })
      ),
      transition('false => true', animate(300 + 'ms ease-in')),
      transition('true => false', animate(300 + 'ms ease-out')),
    ]),
  ],
})
export class AppComponent {
  title = 'fe-wtc-tech-test-angularv2';
  links = [Instructions, Swagger, Design].map((value) => value);
  logo = '../assets/testflix_logo.png';
  openCloseAnimation;
  changeBtn = true;
  public innerWidth: any;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 600) {
      this.changeBtn = false;
      this.mainState.filterOff();
    }
  }

  constructor(private mainState: MainStateService) {
    this.openCloseAnimation = true;
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 600) {
      this.changeBtn = false;
      this.mainState.filterOff();
    }
  }

  openOrCloseMenu(): void {
    this.openCloseAnimation = !this.openCloseAnimation;
  }

  closeFilters() {
    this.openOrCloseMenu();
    this.changeBtn = false;
    this.mainState.filterOff();
  }

  openFilters() {
    this.openOrCloseMenu();
    this.changeBtn = true;
    this.mainState.filterOn();
  }
}
