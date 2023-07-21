// hosts.component.ts
import { Component, OnInit } from '@angular/core';
import { HostService } from '../host.service';

@Component({
  selector: 'app-hosts',
  templateUrl: './hosts.component.html',
  styleUrls: ['./hosts.component.css']
})
export class HostsComponent implements OnInit {
  hosts: any[] = [];
  isCreating: boolean = false;
  isEditing: boolean = false;
  selectedHost: any = {};
  newHost: any = {};

  constructor(private hostService: HostService) { }

  ngOnInit(): void {
    this.getHosts();
  }

  getHosts(): void {
    this.hostService.getHosts().subscribe(
      (response) => {
        this.hosts = response.hosts;
      },
      (error) => {
        console.error('Error fetching hosts:', error);
      }
    );
  }

  createHost(): void {
    this.isCreating = true;
    this.newHost = {};
  }

  saveHost(): void {
    this.hostService.createHost(this.newHost).subscribe(
      () => {
        this.getHosts();
        this.isCreating = false;
      },
      (error) => {
        console.error('Error creating host:', error);
      }
    );
  }

  editHost(host: any): void {
    this.isEditing = true;
    this.selectedHost = { ...host };
  }

  updateHost(): void {
    this.hostService.updateHost(this.selectedHost._id, this.selectedHost).subscribe(
      () => {
        this.getHosts();
        this.isEditing = false;
      },
      (error) => {
        console.error('Error updating host:', error);
      }
    );
  }

  deleteHost(host: any): void {
    this.hostService.deleteHost(host._id).subscribe(
      () => {
        this.getHosts();
      },
      (error) => {
        console.error('Error deleting host:', error);
      }
    );
  }

  cancel(): void {
    this.isCreating = false;
    this.isEditing = false;
    this.selectedHost = {};
    this.newHost = {};
  }
}
