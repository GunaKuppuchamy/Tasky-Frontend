import { Component ,Input} from '@angular/core';
import { MatCard, MatCardContent, MatCardTitle, MatCardModule } from '@angular/material/card';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-task-list',
  imports: [MatCard, CommonModule,  MatTableModule, MatCardModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
task = { title: '', description: '' }; 
tasks: any[] = [];
  displayedColumns: string[] = ['S.No','id', 'title', 'description', 'status', 'changeStatus', 'createdAt', 'updatedAt', 'delete'];

  constructor(private taskService: TaskService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks().subscribe((res: any) => {
      this.tasks = res;
    });
  }

  changeStatus(task: any) {
  if (task.status === 'todo') {
    this.taskService.updateTask(task.id, 'doing').subscribe((updatedTask:any) => {
      // task=updatedTask
       const index = this.tasks.findIndex(t => t.id === updatedTask.id);
      this.tasks[index]=updatedTask;
      this.tasks=[...this.tasks];
      // task.status = 'doing';
    });
  } else if (task.status === 'doing') {
    this.taskService.updateTask(task.id, 'done').subscribe((updatedTask:any) => {
      // task=updatedTask
      const index = this.tasks.findIndex(t => t.id === updatedTask.id);
      this.tasks[index]=updatedTask;
      this.tasks=[...this.tasks];
      // task.status = 'done';
    });
  }
}

getButtonText(status: string): string {
  if (status === 'todo') return 'Mark as Doing';
  if (status === 'doing') return 'Mark as Done';
  return 'Task Done'; 
}


  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== id);
    });
  }

openAddTaskDialog() {
    const dialogRef = this.dialog.open(TaskFormComponent, { width: '400px' });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result) {

this.taskService.addTask(result).subscribe((newTask: any) => {
       this.tasks = [...this.tasks, newTask]; // update table with created task
      });
        // this.tasks.push(result); // add new task to the table
      }
    });
  }

}
