import { Simulation_universe } from "./class/simulation/simulation_universe"

const Universe = new Simulation_universe("universe");

console.log(Universe.compute_scale_factor(0.01, [0,0.5]));
// console.log(Universe.emission_age(0.1));