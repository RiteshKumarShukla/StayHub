// hosts.component.ts
import { Component, OnInit } from '@angular/core';
import { Host } from '../host.model';

@Component({
  selector: 'app-hosts',
  templateUrl: './hosts.component.html',
  styleUrls: ['./hosts.component.css']
})
export class HostsComponent implements OnInit {
  hosts: Host[] = [];
  selectedHost: Host | null = null;
  isCreating: boolean = false;
  isEditing: boolean = false;
  newHost: Host = {
    id: 0,
    name: '',
    status: false,
    location: '',
    propertyType: '',
    about: '',
    hostingSince: new Date()
  };

  ngOnInit() {
    // Fetch hosts data from your backend or a service and update the "hosts" array
    // For demonstration purposes, I'm adding some sample data here
    this.hosts = [
      {
        id: 1,
        name: 'John Doe',
        status: true,
        location: 'New York, USA',
        propertyType: 'Apartment',
        about: 'I love hosting guests and showing them around the city!',
        hostingSince: new Date('2022-01-15')
      },
      // Add more sample hosts here
    ];
  }

  createHost() {
    this.isCreating = true;
    this.selectedHost = null;
  }

  saveHost() {
    // Add the newHost to the hosts array (and save it to the backend if needed)
    this.hosts.push({ ...this.newHost, id: this.hosts.length + 1 });
    this.isCreating = false;
    this.newHost = {
      id: 0,
      name: '',
      status: false,
      location: '',
      propertyType: '',
      about: '',
      hostingSince: new Date()
    };
  }

  editHost(host: Host) {
    this.selectedHost = { ...host };
    this.isEditing = true;
  }

  updateHost() {
    // Find the index of the selectedHost in the hosts array and update it
    const index = this.hosts.findIndex(h => h.id === this.selectedHost?.id);
    if (index !== -1) {
      this.hosts[index] = { ...this.selectedHost! };
      this.isEditing = false;
      this.selectedHost = null;
    }
  }

  deleteHost(host: Host) {
    // Filter out the selectedHost from the hosts array (and delete it from the backend if needed)
    this.hosts = this.hosts.filter(h => h.id !== host.id);
  }

  cancel() {
    this.isCreating = false;
    this.isEditing = false;
    this.selectedHost = null;
    this.newHost = {
      id: 0,
      name: '',
      status: false,
      location: '',
      propertyType: '',
      about: '',
      hostingSince: new Date()
    };
  }
}
