import { Simulation_universe } from "./class/simulation/simulation_universe"

const Universe = new Simulation_universe("universe");

console.log(Universe.Monofluid([0,1], "Radiation"));
// console.log(Universe.emission_age(0.1));
// Universe.compute_scale_factor(0.01, [2,4]);