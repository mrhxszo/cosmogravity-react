import React, { useState, useEffect } from 'react';



export default function YRange(props: { handleChild : Function}) {
  //state to manage the min and max value of the y axis
  const [yRange, setYRange] = useState({ min: 0, max: 5 });

  //useEffect to update the value of min and max
  useEffect(() => {
    props.handleChild(yRange.min, yRange.max);
  }, [yRange]);

  // function to handle the change of input values
  const handleChange = (event: any) => {
    const { id, value } = event.target;
    if (value < 0) {
      event.target.value =  yRange[id as keyof typeof yRange].toString();
      return;
    }
    if (id === 'ami' && value > yRange.max) {
      event.target.value =  yRange[id as keyof typeof yRange].toString();
      return;
    }
    if (id === 'ama' && value < yRange.min) {
      event.target.value =  yRange[id as keyof typeof yRange].toString();
      return;
    }
    setYRange((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <>
      <div>
        <label>
          {' '}
          a<sub>min</sub> ={' '}
        </label>
        <input
          id="min"
          type="text"
          value={yRange.min}
          onChange={handleChange}
        />
        &nbsp;&nbsp;
        <label>
          {' '}
          a<sub>max</sub> ={' '}
        </label>
        <input
          id="max"
          type="text"
          value={yRange.max}
          onChange={handleChange}
        />
        &nbsp;&nbsp;
      </div>
    </>
  );
}
