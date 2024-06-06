// PrintableComponent.tsx
import React, { forwardRef, Ref } from 'react';

const PrintableComponent = forwardRef((props, ref: Ref<HTMLDivElement>) => (
  <div ref={ref}>
    <h1>This is a printable component!</h1>
    <p>You can include any content here that you want to print.</p>
  </div>
));

export default PrintableComponent;
