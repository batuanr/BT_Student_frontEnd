import { Component, OnInit } from '@angular/core';
import {Student} from '../model/Student';
import {Gender} from '../model/Gender';
import {StudentService} from '../service/student.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form: any = {};
  student: Student;
  genders: Gender[] = [];
  status: any;
  error: any = {
    message: 'no avatar'
  };
  success: any = {
    message: 'yes'
  };
  constructor(
    private studentService: StudentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.studentService.getGender().subscribe(data => {
      console.log(data)
      this.genders = data;
    });
  }
  ngSubmit(): any{
    this.student = new Student(
      this.form.name,
      this.form.date,
      new Gender(this.form.id),
      this.form.avatar
    );
    console.log(this.student);
    this.studentService.create(this.student).subscribe(data => {
      if (JSON.stringify(data) === JSON.stringify(this.error)){
        this.status = 'Please upload avatar!';
      }
      if (JSON.stringify(data) === JSON.stringify(this.success)){
        this.studentService.setStatus('create success');
        this.router.navigate(['']);
      }
    });
  }
  onUploadAvatar($event: string): any {
    this.form.avatar = $event;
  }

}
