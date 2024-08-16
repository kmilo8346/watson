import { DataSet } from '../../types';

const dataSet: DataSet = {
  name: 'Tesla Car Sales',
  instructions:
    // 'Identificar si este tweet provee información económica de ventas de autos Tesla, como unidades vendidas o registradas. Debe mostrar de forma explícita datos sobre ventas.',
    'Identificar si este tweet provee información económica de ventas de autos Tesla, como unidades vendidas o registradas. El tweet debe mencionar de forma explícita las cifras de ventas o el registro de unidades vendidas. Comparaciones hipotéticas o cualquier otro dato financiero que no mencione directamente el número de unidades vendidas no debe considerarse como información sobre ventas.',
  examples: [
    {
      input: `Tesla has surpassed 20,000 units registered in Korea, making this Tesla’s best year already since entering the Korean market. 

$TSLA`,
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
      expected_output: false,
    },
    {
      input: `The level of inventory legacy automakers are sitting on in simple terms is like Tesla producing 1,000,000 Teslas and having 500,000 of them sitting in inventory not being sold. This is alarming FACT that is not talked about in mainstream media!`,
      expected_output: false,
    },
  ],
};

export default dataSet;
