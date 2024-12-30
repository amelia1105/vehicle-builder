// Importing Vehicle and Wheel classes
import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';

// Motorbike class extends Vehicle class
class Motorbike extends Vehicle {
  // properties of the Motorbike class
  vin: string;
  color: string;
  make: string;
  model: string;
  year: number;
  weight: number;
  topSpeed: number;
  wheels: Wheel[];

  // constructor that accepts the properties of the Motorbike class
  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[]
  ) {
    // constructor calls the constructor of the parent class, Vehicle
    super();
    // initialize the properties of the Motorbike class
    this.vin = vin;
    this.color = color;
    this.make = make;
    this.model = model;
    this.year = year;
    this.weight = weight;
    this.topSpeed = topSpeed;
    // constructor checks if the wheels array has 2 elements and creates 2 new default Wheel objects if it does not
    if (wheels.length !== 2) {
      this.wheels = [new Wheel(), new Wheel()];
    } else {
      this.wheels = wheels;
    }
  }

  // implement the wheelie method
  wheelie(): void {
    console.log(`Motorbike ${this.make} ${this.model} is doing a wheelie!`);
  }
  // override the printDetails method from the Vehicle class
  override printDetails(): void {
    // method calls the printDetails method of the parent class
    super.printDetails();
    // log the details of the Motorbike
    console.log(`VIN: ${this.vin}`);
    console.log(`Make: ${this.make}`);
    console.log(`Model: ${this.model}`);
    console.log(`Year: ${this.year}`);
    console.log(`Weight: ${this.weight} lbs`)
    console.log(`Top speed: ${this.topSpeed} mph`);
    console.log(`Color: ${this.color}`);
    console.log(`Wheel 1: ${this.wheels[0].getTireBrand}, ${this.wheels[0].getDiameter} inches`);
    console.log(`Wheel 2: ${this.wheels[1].getTireBrand}, ${this.wheels[1].getDiameter} inches`);
}

// Export the Motorbike class as the default export
export default Motorbike;
