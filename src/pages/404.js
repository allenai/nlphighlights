import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/Layout';
import { Footer } from '../components/Footer';
import { getGroupedEpisodes } from '../utils';

export default ({ data }) => {
    const groupedEpisodes = getGroupedEpisodes(data.allMarkdownRemark);

    return (
        <Layout groupedEpisodes={groupedEpisodes}>
            <CenteredContent>
                <span>404</span>
                <p>Page not found.</p>
            </CenteredContent>
            <Footer />
        </Layout>
    );
};

// GraphQL Query
export const pageQuery = graphql`
    {
        allMarkdownRemark {
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        description
                    }
                }
            }
        }
    }
`;

const CenteredContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    span {
        display: block;
        line-height: 20rem;
        margin: 4vh 0;
        font-size: 16rem;
        color: ${({ theme }) => theme.color.N4};
    }

    p {
        ${({ theme }) => theme.typography.bodyJumbo}
    }
`;
