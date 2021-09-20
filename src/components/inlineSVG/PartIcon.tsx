// This component is an SVG boilerplate wrapper for part icons
import * as React from 'react';

export const PartIcon = React.memo(
    (svgProps: React.SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 108 108"
        xmlns="http://www.w3.org/2000/svg"
        {...svgProps}
    />
));