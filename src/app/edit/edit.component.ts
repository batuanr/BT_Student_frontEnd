import { Component, OnInit } from '@angular/core';
import {Student} from '../model/Student';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentService} from '../service/student.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  student: Student;
  success: any = {
    message: 'yes'
  };
  status: any;
  form: any;
  genders: any;
  constructor(
    private studentService: StudentService,
    private atRouter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.studentService.getGender().subscribe(data => {
      this.genders = data;
    });
    this.atRouter.paramMap.subscribe( param => {
      // @ts-ignore
      const id = + param.get('id');
      this.studentService.findById(id).subscribe(data => {
        this.student = data;
      });
    });
  }


  ngSubmit(): void {
    this.studentService.update(this.student.id, this.student).subscribe(data => {
      if (JSON.stringify(data) === JSON.stringify(this.success)){
        this.studentService.setStatus('Update success !');
        console.log(data)
        this.router.navigate(['']);
      }
    });
  }

  onUploadAvatar(event: string): void {
    this.student.avatar = event;
  }

}
