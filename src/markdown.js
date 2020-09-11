import React from 'react';
import rehypeReact from 'rehype-react';

import { TextBlock } from './components/TextBlock';
import { Turn } from './components/Turn';
import { Link } from './components/Link';

// eslint-disable-next-line new-cap
export const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: {
        textblock: TextBlock,
        turn: Turn,
        a: Link
    }
}).Compiler;
