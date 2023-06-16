import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  ngOnInit(): void {
    this.userData = localStorage.getItem('userData');
    this.userData = JSON.parse(this.userData);
    this.name = this.userData.name;
  }
  constructor(
    private userAuthService: UserAuthService,
    private router: Router
  ) {}
  profilePic!: File | null;
  name: string | null = '';
  userData: any;
  onSubmit(f: NgForm) {
    const formData = new FormData();
    formData.append('name', f.value.name);
    formData.append('profilePic', this.profilePic!);
    this.userAuthService.editProfile(formData).subscribe({
      next: (res: any) => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.router.navigate(['/']);
      },
    });
  }
  handleFileInput(event: any) {
    this.profilePic = event.target.files[0];
  }
}
