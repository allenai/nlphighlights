import React from 'react';
import rehypeReact from 'rehype-react';

import Exercise from './components/Exercise';
import { TextBlock } from './components/TextBlock';
import { Link } from './components/Link';

// eslint-disable-next-line new-cap
export const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: {
        exercise: Exercise,
        textblock: TextBlock,
        a: Link
    }
}).Compiler;
