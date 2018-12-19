import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import decode from 'jwt-decode';

import { AuthService } from '../AuthService';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    adminReturnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthService
    ) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
        this.adminReturnUrl = this.route.snapshot.queryParams['returnUrl'] || '/adminHome';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    const tokenPayload = decode(data.access_token);
                    if (tokenPayload.authorities[0] === 'ROLE_USER') {
                        this.router.navigate([this.returnUrl]);
                    } else if (tokenPayload.authorities[0] === 'ROLE_ADMIN') {
                        this.router.navigate([this.adminReturnUrl]);
                    }
                },
                error => {
                    this.error = 'Wrong username or password';
                    this.loading = false;
                });
    }
}
