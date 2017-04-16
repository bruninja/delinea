import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { AlertService, UserService } from '../_services/index';
import { User } from '../_models/user';

@Component({
    moduleId: module.id,
    templateUrl: 'edicao.component.html'
})

export class EditarComponent implements OnInit {
    model: any = {};
    user: User = new User();
    loading = false;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private location: Location,
        private alertService: AlertService) { }

    ngOnInit(): void {
      this.route.params
        .switchMap((params: Params) => this.userService.getById(+params['id']))
        .subscribe(user => this.user = user);
    }

    goBack(): void {
      this.location.back();
    }


    salvar() {
        this.loading = true;
        this.userService.update(this.user)
            .subscribe(
                data => {
                    this.alertService.success('Atualizado  realizado com Sucesso', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
