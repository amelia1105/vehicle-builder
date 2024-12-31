// importing classes from other files
import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";

// define the Cli class
class Cli {
  // select type of vehicle
  vehicles: (Car | Truck | Motorbike)[] ;  
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

  constructor(vehicles: (Car | Truck | Motorbike)[]) {
    this.vehicles = vehicles;
  }

  // static method to generate a vin
  static generateVin(): string {
    // return a random string
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  // method to choose a vehicle from existing vehicles
  chooseVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedVehicleVin',
          message: 'Select a vehicle to perform an action on',
          choices: this.vehicles.map((vehicle) => {
            return {
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle.vin,
            };
          }),
        },
      ])
      .then((answers) => {
        // set the selectedVehicleVin to the vin of the selected vehicle
        this.selectedVehicleVin = answers.selectedVehicleVin;
        // perform actions on the selected vehicle
        this.performActions();
      });
  }

  // method to create a vehicle
  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleType',
          message: 'Select a vehicle type',
          choices: ['Car', 'Truck', 'Motorbike'],
        },
      ])
      .then((answers) => {
        if (answers.vehicleType === 'Car') {
          // create a car
          this.createCar();
        }
        else if (answers.vehicleType === 'Truck') {
          // create a truck
          this.createTruck();
        }
        else {
          // create a motorbike
          this.createMotorbike();
        }
      });
  }

  // method to create a car
  createCar(): void {
    inquirer
      .prompt([
      {
        type: 'input',
        name: 'color',
        message: 'Enter color',
        validate: (input) => {
          if (input === '' || typeof input !== 'string' || /\d/.test(input)) {
          return 'Please enter a valid color';
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'make',
        message: 'Enter make',
        validate: (input) => {
          if (input === '' || typeof input !== 'string' || /\d/.test(input)) {
          return 'Please enter a valid make';
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'model',
        message: 'Enter model',
        validate: (input) => {
          if (input === '' || typeof input !== 'string') { // some car models have numbers in the name
          return 'Please enter a valid model';
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'year',
        message: 'Enter year',
        validate: (input) => {
          const year = parseInt(input);
          if (isNaN(year) || year < 1886 || year > new Date().getFullYear() || input === '') { // 1886 is the year the first car was patented
            return 'Please enter a valid year';
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'weight',
        message: 'Enter weight in lbs',
        validate: (input) => {
          const weight = parseInt(input);
          if (isNaN(weight) || weight <= 0 || input === '') {
            return 'Please enter a valid weight';
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'topSpeed',
        message: 'Enter top speed in mph',
        validate: (input) => {
          const topSpeed = parseInt(input);
          if (isNaN(topSpeed) || topSpeed <= 0 || input === '') {
            return 'Please enter a valid top speed';
          }
          return true;
        }
      },
      ])
      .then((answers) => {
      const car = new Car(
        Cli.generateVin(),
        // pass required properties to the Car constructor
        answers.color, 
        answers.make,
        answers.model,
        parseInt(answers.year),
        parseInt(answers.weight),
        parseInt(answers.topSpeed),
        []
      );
      // push the car to the vehicles array
      this.vehicles.push(car);
      // set the selectedVehicleVin to the vin of the car
      this.selectedVehicleVin = car.vin;
      // perform actions on the car
      this.performActions();
      });
  }

  // method to create a truck
  createTruck(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter color',
          validate: (input) => {
            if (input === '' || typeof input !== 'string' || /\d/.test(input)) {
            return 'Please enter a valid color';
            }
            return true;
          }
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter make',
          validate: (input) => {
            if (input === '' || typeof input !== 'string' || /\d/.test(input)) {
            return 'Please enter a valid make';
            }
            return true;
          }
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter model',
          validate: (input) => {
            if (input === '' || typeof input !== 'string') {
            return 'Please enter a valid model';
            }
            return true;
          }
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter year',
          validate: (input) => {
            const year = parseInt(input);
            if (isNaN(year) || year < 1896 || year > new Date().getFullYear() || input === '') { // 1896 is the year the first truck was built
              return 'Please enter a valid year';
            }
            return true;
          }
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter weight in lbs',
          validate: (input) => {
            const weight = parseInt(input);
            if (isNaN(weight) || weight <= 0 || input === '') {
              return 'Please enter a valid weight';
            }
            return true;
          }
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter top speed in mph',
          validate: (input) => {
            const topSpeed = parseInt(input);
            if (isNaN(topSpeed) || topSpeed <= 0 || input === '') {
              return 'Please enter a valid top speed';
            }
            return true;
          }
        },
        {
          type: 'input',
          name: 'towingCapacity',
          message: 'Enter towing capacity',
          validate: (input) => {
            const towingCap = parseInt(input);
            if (isNaN(towingCap) || towingCap <= 0 || input === '') {
              return 'Please enter a valid towing capacity';
            }
            return true;
          }
        },
      ])
        .then((answers) => {
          const truck = new Truck(
            Cli.generateVin(),
             // pass required properties to the Truck constructor
            answers.color,
            answers.make,
            answers.model,
            parseInt(answers.year),
            parseInt(answers.weight),
            parseInt(answers.topSpeed),
            [],
            parseInt(answers.towingCapacity),
          );
          // push the truck to the vehicles array
          this.vehicles.push(truck);
          // set the selectedVehicleVin to the vin of the truck
          this.selectedVehicleVin = truck.vin;
          // perform actions on the truck
          this.performActions();
        });
    }

  // method to create a motorbike
  createMotorbike(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter color',
          validate: (input) => {
            if (input === '' || typeof input !== 'string' || /\d/.test(input)) {
              return 'Please enter a valid color';
            }
            return true;
          }
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter make',
          validate: (input) => {
            if (input === '' || typeof input !== 'string' || /\d/.test(input)) {
            return 'Please enter a valid make';
            }
            return true;
          }
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter model',
          validate: (input) => {
            if (input === '' || typeof input !== 'string') {
            return 'Please enter a valid model';
            }
            return true;
          }
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter year',
          validate: (input) => {
            const year = parseInt(input);
            if (isNaN(year) || year < 1885 || year > new Date().getFullYear() || input === '') { // 1885 is the year the first motorbike was invented
              return 'Please enter a valid year';
            }
            return true;
          }
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter weight in lbs',
          validate: (input) => {
            const weight = parseInt(input);
            if (isNaN(weight) || weight <= 0 || input === '') {
              return 'Please enter a valid weight';
            }
            return true;
          }
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter top speed in mph',
          validate: (input) => {
            const topSpeed = parseInt(input);
            if (isNaN(topSpeed) || topSpeed <= 0 || input === '') {
              return 'Please enter a valid top speed';
            }
            return true;
          }
        },
        {
          type: 'input',
          name: 'frontWheelDiameter',
          message: 'Enter front wheel diameter in inches',
          validate: (input) => {
            const fDiameter = parseInt(input);
            if (isNaN(fDiameter) || fDiameter <= 0 || input === '') {
              return 'Please enter a valid front wheel diameter';
            }
            return true;
          }
        },
        {
          type: 'input',
          name: 'frontWheelBrand',
          message: 'Enter front wheel brand',
          validate: (input) => {
            if (input === '' || typeof input !== 'string') {
            return 'Please enter a valid brand';
            }
            return true;
          }
        },
        {
          type: 'input',
          name: 'rearWheelDiameter',
          message: 'Enter rear wheel diameter in inches',
          validate: (input) => {
            const rDiameter = parseInt(input);
            if (isNaN(rDiameter) || rDiameter <= 0 || input === '') {
              return 'Please enter a valid rear wheel diameter';
            }
            return true;
          }
        },
        {
          type: 'input',
          name: 'rearWheelBrand',
          message: 'Enter rear wheel brand',
          validate: (input) => {
            if (input === '' || typeof input !== 'string') {
            return 'Please enter a valid brand';
            }
            return true;
          }
        },
      ])
      .then((answers) => {
        const motorbike = new Motorbike(
          Cli.generateVin(),
          // pass required properties to the Motorbike constructor
          answers.color, 
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [
            new Wheel(parseInt(answers.frontWheelDiameter), answers.frontWheelBrand),
            new Wheel(parseInt(answers.rearWheelDiameter), answers.rearWheelBrand)
          ]
        );
        // push the motorbike to the vehicles array
        this.vehicles.push(motorbike);
        // set the selectedVehicleVin to the vin of the motorbike
        this.selectedVehicleVin = motorbike.vin;
        // perform actions on the motorbike
        this.performActions();
      });
  }


  // method to find a vehicle to tow
  findVehicleToTow(truck: Truck): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleToTow',
          message: 'Select a vehicle to tow',
          choices: this.vehicles.map((vehicle) => {
            return {
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle,
            };
          }),
        },
      ])
      .then((answers) => {
        // check if the selected vehicle is the truck
        if (answers.vehicleToTow.vin === truck.vin) {
           // if it is, log that the vehicle cannot tow itself
          console.log('This vehicle cannot tow itself');
          // then perform actions on the truck to allow the user to select another action
          this.performActions(); 
        } else {
          // if it is not, tow the selected vehicle
          truck.tow(answers.vehicleToTow); 
          // perform actions on the truck to allow the user to select another action
          this.performActions();
        }
      });
  }

  // method to perform actions on a vehicle
  performActions(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'action',
          message: 'Select an action',
          choices: [
            'Print details',
            'Start vehicle',
            'Accelerate 5 MPH',
            'Decelerate 5 MPH',
            'Stop vehicle',
            'Turn right',
            'Turn left',
            'Reverse',
            'Tow',
            'Wheelie',
            'Select or create another vehicle',
            'Exit',
          ],
        },
      ])
      .then((answers) => {
        // perform the selected action
        if (answers.action === 'Print details') {
          // find the selected vehicle and print its details
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].printDetails();
            }
          }
        } else if (answers.action === 'Start vehicle') {
          // find the selected vehicle and start it
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].start();
            }
          }
        } else if (answers.action === 'Accelerate 5 MPH') {
          // find the selected vehicle and accelerate it by 5 MPH
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].accelerate(5);
            }
          }
        } else if (answers.action === 'Decelerate 5 MPH') {
          // find the selected vehicle and decelerate it by 5 MPH
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].decelerate(5);
            }
          }
        } else if (answers.action === 'Stop vehicle') {
          // find the selected vehicle and stop it
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].stop();
            }
          }
        } else if (answers.action === 'Turn right') {
          // find the selected vehicle and turn it right
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].turn('right');
            }
          }
        } else if (answers.action === 'Turn left') {
          // find the selected vehicle and turn it left
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].turn('left');
            }
          }
        } else if (answers.action === 'Reverse') {
          // find the selected vehicle and reverse it
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].reverse();
            }
          }
        } else if (answers.action === 'Tow') {
          // find the selected vehicle and tow another vehicle
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              // call the findVehicleToTow method to find a vehicle to tow
              this.findVehicleToTow(this.vehicles[i] as Truck);
              // return to avoid instantly calling the performActions method again since findVehicleToTow is asynchronous
              return; 
            }
          }
        } else if (answers.action === 'Wheelie') {
          // find the selected vehicle and perform a wheelie
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              // check if the selected vehicle is a motorbike
              if (this.vehicles[i] instanceof Motorbike) {
                // if it is, perform a wheelie
                (this.vehicles[i] as Motorbike).wheelie();
              } else {
                // if it is not, log that the selected vehicle cannot perform a wheelie
                console.log('The selected vehicle cannot perform a wheelie');
              }
            }
          }
        } else if (answers.action === 'Select or create another vehicle') {
          // start the cli to return to the initial prompt if the user wants to select or create another vehicle
          this.startCli();
          return;
        } else {
          // exit the cli if the user selects exit
          this.exit = true;
        }
        if (!this.exit) {
          // if the user does not want to exit, perform actions on the selected vehicle
          this.performActions();
        }
      });
  }

  // method to start the cli
  startCli(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'CreateOrSelect',
          message:
            'Would you like to create a new vehicle or perform an action on an existing vehicle?',
          choices: ['Create a new vehicle', 'Select an existing vehicle'],
        },
      ])
      .then((answers) => {
        // check if the user wants to create a new vehicle or select an existing vehicle
        if (answers.CreateOrSelect === 'Create a new vehicle') {
          this.createVehicle();
        } else {
          this.chooseVehicle();
        }
      });
  }
}

// export the Cli class
export default Cli;
