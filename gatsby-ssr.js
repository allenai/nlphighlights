import React from 'react';

export const onRenderBody = ({ setPostBodyComponents }) => {
    setPostBodyComponents([
        <script
            src="https://stats.allenai.org/init.min.js"
            data-spa="true"
            data-app-name="nlphighlights"
            async
        />
    ]);
};
