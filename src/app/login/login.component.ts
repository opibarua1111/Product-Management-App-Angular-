import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  constructor(private fb: FormBuilder,private authService: AuthService, private toastrService: ToastrService) { }

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
      this.loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(this.loginModel).subscribe((res: any) => {
        this.toastrService.success('', 'Login Successfully.');
      }, error => {
        console.log(error);
        this.toastrService.error('', `${error?.error?.message}`);
      });
    } else {
      console.log('Form Not Valid');
    }
  }
}
