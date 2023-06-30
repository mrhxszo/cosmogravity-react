import { Simulation_universe } from "./class/simulation/simulation_universe"

const Universe = new Simulation_universe("universe");

Universe.dark_energy.w_0 = -2;

let a = Universe.compute_scale_factor(1, [0,100000]).y;

console.log(a[a.length-1]);
console.log(a.length);
// console.log(Universe.emission_age(0.1));
// Universe.compute_scale_factor(0.01, [2,4]);