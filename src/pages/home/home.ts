import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit{

	  public latitude: number;
	  public longitude: number;
	  public searchControl: FormControl;
	  public zoom: number;
	  public location: any;

	  @ViewChild("search")
	  public searchElementRef: ElementRef;

	  constructor(
	    private mapsAPILoader: MapsAPILoader,
	    private ngZone: NgZone
	  ) {}

	  ngOnInit() {
	    //set google maps defaults
	    this.zoom = 10;
	    this.latitude = 39.7392;
	    this.longitude = -104.9903;

	    //create search FormControl
	    this.searchControl = new FormControl();

	    //set current position
	    this.setCurrentPosition();

	    //load Places Autocomplete
	    this.mapsAPILoader.load().then(() => {
	      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
	      });
	      autocomplete.addListener("place_changed", () => {
	        this.ngZone.run(() => {
	          //get the place result
	          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
	          
	          //verify result
	          if (place.geometry === undefined || place.geometry === null) {
	            return;
	          }

	          //set latitude, longitude and zoom
	          this.latitude = place.geometry.location.lat();
	          this.longitude = place.geometry.location.lng();
	          this.zoom = 16;
	        });
	      });
	    });
	  }

	  private setCurrentPosition() {
	  	let lat;
	  	let lng;
	    if ("geolocation" in navigator) {
	      navigator.geolocation.getCurrentPosition((position) => {
	        this.latitude = position.coords.latitude;
	        this.longitude = position.coords.longitude;
	        this.zoom = 14;
	        lat = position.coords.latitude;
	        lng = position.coords.longitude;
	      });
	    }
	  }

	}
