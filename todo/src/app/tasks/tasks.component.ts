import { Component } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent {
  tasks: any[] = [];
  newTask: string = '';

  addTask() {
    if (this.newTask) {
      this.tasks.push({
        name: this.newTask,
        completed: false,
        timestamp: new Date(),
        elapsedTime: 0,
        timer: null
      });
      this.newTask = '';
    }
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }

  toggleCompletion(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;
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

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  }
}
