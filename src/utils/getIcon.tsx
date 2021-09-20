import React from 'react';
import { CubeIcon, RocketIcon, StackIcon, ToolsIcon, TextIcon } from '../components/inlineSVG';

export const getIcon = (icon, size = 108) => {
    if (icon === 'stack') {
        return <StackIcon width={size} height={size} />;
    } else if (icon === 'rocket') {
        return <RocketIcon width={size} height={size} />;
    } else if (icon === 'cube') {
        return <CubeIcon width={size} height={size} />;
    } else if (icon === 'tools') {
        return <ToolsIcon width={size} height={size} />;
    } else {
        // 'default'
        return <TextIcon width={size} height={size} />;
    }
};
