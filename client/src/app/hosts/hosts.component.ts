import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HostService } from '../host.service';

@Component({
  selector: 'app-hosts',
  templateUrl: './hosts.component.html',
  styleUrls: ['./hosts.component.css']
})
export class HostsComponent implements OnInit {
  properties: any[] = [];
  propertyForm: FormGroup;
  isEditing: boolean = false; // Add this property to track editing state

  constructor(private formBuilder: FormBuilder, private hostService: HostService) {
    this.propertyForm = this.formBuilder.group({
      _id: [''],
      title: ['', Validators.required],
      location: ['', Validators.required],
      property_type: ['', Validators.required],
      description: ['', Validators.required],
      price_per_night: ['', Validators.required],
      status: ['', Validators.required],
      img: ['']
    });
  }

  ngOnInit() {
    this.fetchProperties();
  }

  fetchProperties() {
    this.hostService.getProperties().subscribe(
      (data) => {
        this.properties = data;
      },
      (error) => {
        console.error('Error fetching properties:', error);
      }
    );
  }

  onSubmit() {
    const formData = this.propertyForm.value;
    if (formData._id) {
      this.hostService.updateProperty(formData).subscribe(
        () => {
          this.fetchProperties();
          this.resetForm();
        },
        (error) => {
          console.error('Error updating property:', error);
        }
      );
    } else {
      this.hostService.createProperty(formData).subscribe(
        () => {
          this.fetchProperties();
          this.resetForm();
        },
        (error) => {
          console.error('Error creating property:', error);
        }
      );
    }
  }

  onEditProperty(property: any) {
    this.propertyForm.patchValue(property);
    this.isEditing = true; // Set editing state to true
  }

  onCancelEdit() {
    this.isEditing = false; // Set editing state to false
    this.resetForm();
  }

  onDeleteProperty(propertyId: string) {
    if (confirm('Are you sure you want to delete this property?')) {
      this.hostService.deleteProperty(propertyId).subscribe(
        () => {
          this.fetchProperties();
        },
        (error) => {
          console.error('Error deleting property:', error);
        }
      );
    }
  }

  resetForm() {
    this.propertyForm.reset();
  }
}
