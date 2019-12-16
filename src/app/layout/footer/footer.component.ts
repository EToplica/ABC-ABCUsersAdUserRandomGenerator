import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemeService } from '../../../@fury/services/theme.service';
import { map } from 'rxjs/operators';
import {User} from '../../models/user/User';
import {AuthService} from '../../authentication/services/auth.service';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'fury-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {

  visible$ = this.themeService.config$.pipe(map(config => config.footerVisible));
  constructor(private themeService: ThemeService,
              ) {
  }
  ngOnInit() {
  }

  hide() {
    this.themeService.setFooterVisible(false);
  }
  ngOnDestroy(): void {}
}
