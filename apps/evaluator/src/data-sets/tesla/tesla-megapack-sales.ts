import { DataSet } from '../../types';

const dataSet: DataSet = {
  name: 'Tesla Megapack Sales',
  instructions:
    // 'Identificar si este tweet trata sobre un proyecto de Tesla Megapack.',
    // 'Identifica si el tweet trata sobre un proyecto específico de Tesla Megapack, es decir, una instalación, desarrollo o implementación concreta de Megapack. Excluye menciones generales a Megapack que no estén relacionadas con un proyecto o evento específico.',
    'Identifica si el tweet trata sobre un proyecto específico de Tesla Megapack, como la instalación de Megapacks en una ubicación determinada para almacenamiento de energía o un contrato específico. Excluye menciones a fábricas o producción de Megapacks, a menos que estén directamente relacionadas con un proyecto de implementación concreta.',
  examples: [
    {
      input: `NEWS: Construction has begun in Queensland, Australia on a new $750 million 
@Tesla
 Megapack battery storage facility.

The 300 MW/1,200 MWh Stanwell battery marks the start of the transformation of the major coal center into a green energy hub.`,
      expected_output: true,
    },
    {
      input: `Low cost fossil fuels power our economy, allowing us to build and ship EVs, Megapacks and robots faster $TSLA`,
      expected_output: false,
    },
    {
      input: `I do wonder if Tesla will end up releasing a bigger pack possibly obsoleting the need for the range extender. Hmmm 🤔`,
      expected_output: false,
    },
    {
      input: `Megapacks at the @edify_energy site are equipped with grid forming technology to provide system strength services to the grid, allowing for greater integration of wind and solar`,
      expected_output: true,
    },
    {
      input: `$TSLA
Arevon puts 800MWh California BESS into operation.

It utilises Tesla Megapacks and its energy has been secured by utility Southern California Edison (SCE) under a long-term Resource Adequacy agreement.

energy-storage.news/arevon-puts-80…`,
      expected_output: true,
    },
    {
      input: `70 MWh of Megapacks have been energized at @Harmony_Energy_'s site in North Yorkshire. The project adds to Harmony’s 1.1 GWh of Megapack operated by Autobidder`,
      expected_output: true,
    },
    {
      input: `Tesla Megapack Factory in Shanghai.

Progress has been insane thanks to Tesla’s China team.

This MegaFactory is expected to be completed in Q1 2025 and will double Tesla’s annual production capacity.

It will have an expected annual capacity of 10,000 Megapacks or 40 GWh of…`,
      expected_output: false,
    },
  ],
};

export default dataSet;
