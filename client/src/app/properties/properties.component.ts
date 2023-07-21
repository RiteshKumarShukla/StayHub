// properties.component.ts
import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../property.service';
import { Property } from '../property.model';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
  properties: Property[] = [];

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.getProperties();
  }

  getProperties(): void {
    this.propertyService.getProperties().subscribe(
      (data: Property[]) => {
        this.properties = data;
        console.log(this.properties)

      },
      (error) => {
        console.error('Error fetching properties:', error);
      }
    );
  }
}
