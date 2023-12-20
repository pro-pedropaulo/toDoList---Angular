import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: any[] = [];
  newTask: string = '';
  showModal: boolean = false;
  selectedTaskIndex: number | null = null;

  ngOnInit(): void {
    this.loadTasks();
  }

  addTask(): void {
    if (this.newTask.trim()) {
      this.tasks.push({
        name: this.newTask,
        completed: false,
        timestamp: new Date(),
        elapsedTime: 0,
        timer: null
      });
      this.newTask = '';
      this.saveTasks();
    }
  }

  confirmDelete(index: number): void {
    this.selectedTaskIndex = index;
    this.showModal = true;
  }

  deleteTask(): void {
    if (this.selectedTaskIndex !== null) {
      this.tasks.splice(this.selectedTaskIndex, 1);
      this.saveTasks();
    }
    this.closeModal();
  }

  toggleCompletion(index: number): void {
    this.tasks[index].completed = !this.tasks[index].completed;
    this.saveTasks();
  }

  formatTime(seconds: number): string {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    let result = '';
    if (hrs > 0) result += `${hrs} hora${hrs > 1 ? 's' : ''} `;
    if (mins > 0) result += `${mins} minuto${mins > 1 ? 's' : ''} `;
    result += `${secs} segundo${secs !== 1 ? 's' : ''}`;
    return result;
  }

 startTimer(task: any) {
    if (!task.timer) {
      task.timer = setInterval(() => {
        task.elapsedTime++;
      }, 1000);
    }
  }

  stopTimer(task: any) {
    if (task.timer) {
      clearInterval(task.timer);
      task.timer = null;
    }
  }

  closeModal(): void {
    this.showModal = false;
  }

   saveTasks(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

   loadTasks(): void {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  }
}
