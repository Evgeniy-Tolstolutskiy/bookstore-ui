import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    user: User = new User();
    userForm: FormGroup;
    loading = false;
    submitted = false;
    userSuccessfullyUpdated: string;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private http: HttpClient,
        private datePipe: DatePipe,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.activatedRoute.queryParams
            .subscribe(params => {
                this.userSuccessfullyUpdated = params.success;
            });

        this.http.get<User>(`${config.apiUrl}/users/me`).pipe(first()).subscribe(user => {
            this.user = user;
            this.userForm = this.formBuilder.group({
                username: [user.username, Validators.required],
                password: ['', [Validators.required, Validators.minLength(6)]],
                confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
                email: [user.email, Validators.required],
                birthday: [this.datePipe.transform(new Date(user.birthday), "yyyy-MM-dd"), Validators.required],
                gender: [user.gender, Validators.required]
            }, { validator: this.checkPasswords });
        });

        this.userForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required],
            email: ['', Validators.required],
            birthday: ['', Validators.required],
            gender: ['', Validators.required]
        });
    }

    checkPasswords(group: FormGroup) {
        let pass = group.controls.password.value;
        let confirmPass = group.controls.confirmPassword.value;

        return pass === confirmPass ? null : { notMatch: true }
    }

    get f() { return this.userForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.userForm.invalid) {
            return;
        }

        this.loading = true;
        this.http.put(`${config.apiUrl}/users`, this.userForm.value)
            .pipe(first())
                .subscribe(
                    data => {
                        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
                        this.router.navigate(["/profile"], { queryParams: { success: 'User successfully updated' } }));
                    },
                    error => {
                        this.loading = false;
                    });
    }
}
