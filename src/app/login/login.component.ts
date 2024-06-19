import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  loginModel: any;
  loading:boolean = false;
  constructor(private fb: FormBuilder, private authService: AuthService,
    private toastrService: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }
  createLoginForm() {
    this.loginForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  login() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(this.loginModel).subscribe((res: any) => {
        this.toastrService.success('', 'Login Successfully.');
        this.loading = false;
        this.router.navigate(['/product']);  // Redirect to /product page
      }, error => {
        console.log(error);
        this.toastrService.error('', `${error?.error?.message}`);
        this.loading = false;
      });
    } else {
      console.log('Form Not Valid');
    }
  }
}
