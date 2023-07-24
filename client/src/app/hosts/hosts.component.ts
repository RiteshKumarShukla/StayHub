import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HostService } from '../host.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'; // Import SweetAlert

@Component({
  selector: 'app-hosts',
  templateUrl: './hosts.component.html',
  styleUrls: ['./hosts.component.css']
})
export class HostsComponent implements OnInit {
  properties: any[] = [];
  property: any = {};
  propertyForm: FormGroup;
  isEditing: boolean = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private hostService: HostService) {
    this.propertyForm = this.formBuilder.group({
      id: [''],
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
    if (formData.id) {
      this.http.put<any>('https://stayhub-backend.onrender.com/api/properties/' + formData.id, formData)
        .subscribe(
          () => {
            this.fetchProperties();
            this.resetForm();
            Swal.fire({
              title: 'Updated!',
              text: 'The property has been updated successfully.',
              icon: 'success',
            });
          },
          (error) => {
            console.error('Error updating property:', error);
            Swal.fire({
              title: 'Error',
              text: 'An error occurred while updating the property.',
              icon: 'error',
            });
          }
        );
    } else {
      this.http.post<any>('https://stayhub-backend.onrender.com/api/properties', formData)
        .subscribe(
          () => {
            this.fetchProperties();
            this.resetForm();
            Swal.fire({
              title: 'Created!',
              text: 'The property has been created successfully.',
              icon: 'success',
            });
          },
          (error) => {
            console.error('Error creating property:', error);
            Swal.fire({
              title: 'Error',
              text: 'An error occurred while creating the property.',
              icon: 'error',
            });
          }
        );
    }
  }

  onEditProperty(property: any) {
    if (property && property.id) {
      this.propertyForm.patchValue(property);
      this.isEditing = true;
      this.propertyForm.get('id')?.setValue(property.id);
    } else {
      console.error('Invalid property ID:', property);
    }
  }

  onCancelEdit() {
    this.isEditing = false;
    this.resetForm();
  }

  onDeleteProperty(propertyId: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this property. This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.hostService.deleteProperty(propertyId).subscribe(
          () => {
            this.fetchProperties();
            Swal.fire({
              title: 'Deleted!',
              text: 'The property has been deleted successfully.',
              icon: 'success',
            });
          },
          (error) => {
            console.error('Error deleting property:', error);
            Swal.fire({
              title: 'Error',
              text: 'An error occurred while deleting the property.',
              icon: 'error',
            });
          }
        );
      }
    });
  }

  resetForm() {
    this.propertyForm.reset();
  }
}
