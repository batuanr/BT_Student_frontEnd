import {Component, OnInit, ViewChild} from '@angular/core';
import {Student} from '../model/Student';
import {MatPaginator} from '@angular/material/paginator';
import {StudentService} from '../service/student.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'birthDay', 'gender' , 'avatar' , 'edit', 'delete'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  students: Student[] = [];
  status: any;

  constructor(
    private studentService: StudentService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAll();
  }
  getAll(): void{
    this.studentService.getAll().subscribe(data => {
      this.students = data;
      this.dataSource = new MatTableDataSource<Student>(this.students);
      this.dataSource.paginator = this.paginator;
    });
  }
  delete(id: number): void{
    this.studentService.delete(id).subscribe(() => {
      this.getAll();
    })
  }
  openDialog(id: number): any {
    const dialog = this.dialog.open(DialogComponent);
    dialog.afterClosed().subscribe(result => {
      if (result){
        this.delete(id);
      }
    });
  }

}
