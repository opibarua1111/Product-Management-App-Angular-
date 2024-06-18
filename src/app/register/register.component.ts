import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm!: FormGroup;
  registerModel: any;
  constructor(private fb: FormBuilder,private authService: AuthService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }
  createRegisterForm() {
    this.registerForm = this.fb.group({
      UserName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  onSubmit() {
    if (this.registerForm.valid) {
      this.registerModel = Object.assign({}, this.registerForm.value);
      this.authService.register(this.registerModel).subscribe((res:any) => {
        this.toastrService.success('', 'Registration Successfully.');
      }, error => {
        console.log(error);
        this.toastrService.error('', `${error.error.errors[0].description}`);
      });
    } else {
      console.log('Form Not Valid');
    }
  }
}
