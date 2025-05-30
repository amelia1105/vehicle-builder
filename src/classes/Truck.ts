// import the Vehicle, Motorbike, Car, Wheel, and AbleToTow classes/interfaces
import Vehicle from './Vehicle.js';
import Motorbike from './Motorbike.js';
import Car from './Car.js';
import Wheel from './Wheel.js';
import AbleToTow from '../interfaces/AbleToTow.js';

// Truck class extends the Vehicle class and implements the AbleToTow interface
class Truck extends Vehicle implements AbleToTow {
  // properties of the Truck class
  vin: string;
  color: string;
  make: string;
  model: string;
  year: number;
  weight: number;
  topSpeed: number;
  wheels: Wheel[];
  towingCapacity: number;
  
  // constructor that accepts properties of the Truck class
  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[],
    towingCapacity: number
  ) {
    // constructor calls the constructor of the parent class, Vehicle
    super();
    // initialize the properties of the Truck class
    this.vin = vin;
    this.color = color;
    this.make = make;
    this.model = model;
    this.year = year;
    this.weight = weight;
    this.topSpeed = topSpeed;
    this.towingCapacity = towingCapacity; // need to initialize towingCapacity as well to avoid error
    // check if the wheels array has 4 elements
    if (wheels.length !== 4) {
      // if not, create 4 new default Wheel objects
      this.wheels = [new Wheel(), new Wheel(), new Wheel(), new Wheel()];
    } else {
      // otherwise, use the provided wheels array
      this.wheels = wheels;
    }
  }

  // implement the tow method from the AbleToTow interface
  tow(vehicle: Truck | Motorbike | Car): void {
    // get the make an model of the vehicle if it exists
    let vehicleMakeModel = '';
    if (vehicle.make && vehicle.model) {
      vehicleMakeModel = `${vehicle.make} ${vehicle.model}`;
    }
    // check if the vehicle's weight is less than or equal to the truck's towing capacity
    if (vehicle.weight <= this.towingCapacity) {
      // if it is, log that the vehicle is being towed
      console.log(`${vehicleMakeModel} is being towed`);
    } else {
      // if it is not, log that the vehicle is too heavy to be towed
      console.log(`${vehicleMakeModel} is too heavy to be towed`);
    }
  }

  // override the printDetails method from the Vehicle class
  override printDetails(): void {
    // call the printDetails method of the parent class
    super.printDetails();
    // log the details of the Truck
    console.log(`VIN: ${this.vin}`);
    console.log(`Make: ${this.make}`);
    console.log(`Model: ${this.model}`);
    console.log(`Year: ${this.year}`);
    console.log(`Weight: ${this.weight}`);
    console.log(`Top speed: ${this.topSpeed}`);
    console.log(`Color: ${this.color}`);
    console.log(`Towing capacity: ${this.towingCapacity}`);
    console.log(`Wheel 1: ${this.wheels[0].getDiameter} inch with a ${this.wheels[0].getTireBrand} tire`);
    console.log(`Wheel 2: ${this.wheels[1].getDiameter} inch with a ${this.wheels[1].getTireBrand} tire`);
    console.log(`Wheel 3: ${this.wheels[2].getDiameter} inch with a ${this.wheels[2].getTireBrand} tire`);
    console.log(`Wheel 4: ${this.wheels[3].getDiameter} inch with a ${this.wheels[3].getTireBrand} tire`);
  }
}

// Export the Truck class as the default export
export default Truck;
