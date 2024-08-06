import { DataSet } from '../types';

const dataSet: DataSet = {
  name: 'Car Sales Performance',
  instructions:
    'Identificar si este tweet menciona el rendimiento de ventas de autos Tesla, como unidades vendidas, registradas o aseguradas. Debe mostrar de forma explícita datos sobre ventas.',
  examples: [
    {
      input: `Tesla has surpassed 20,000 units registered in Korea, making this Tesla’s best year already since entering the Korean market. 

$TSLA`,
      expected_output: true,
    },
    {
      input: `NEWS: 12,500 Teslas were insured in China last week.`,
      expected_output: true,
    },
    {
      input: `$TSLA 🇨🇳
BREAKING: Tesla China insured units

< Aug 2024>
(29)-4 : 12,500 `,
      expected_output: true,
    },
    {
      input: `it amuses me to see the anguish of Cybertruck haters as sales continue to grow

Face it. It's hands down the best vehicle you can get.`,
      expected_output: false,
    },
    {
      input: `In 2015 Tesla was losing over $4,000 per vehicle sold.

In 2023 Tesla earned over $8,000 per vehicle sold.

A lot can change in a decade.

The macro environment and interest rates are also much harsher now.

As Elon said, “Prototypes are easy, production is hard.”

Tesla remains…`,
      expected_output: true,
    },
  ],
};

export default dataSet;
