import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import useLocalStorage from '@illinois/react-use-local-storage';
import styled, { createGlobalStyle, css } from 'styled-components';

import { renderAst } from '../markdown';
import { EpisodeContext } from '../context';
import Layout from '../components/Layout';
import { IconBox } from '../components/IconBox';
import { Navigation } from '../components/Navigation';

import { getGroupedEpisodes } from '../utils/utils';

function formatStringList(headingSingular, headingPlural, strings) {
    if (strings === undefined || strings.length === 0) {
        return '';
    } else if (strings.length === 1) {
        return headingSingular + ': ' + strings[0];
    } else {
        return headingPlural + ': ' + strings.join(', ');
    }
}

const Template = ({ data, location }) => {
    const { allMarkdownRemark, markdownRemark, site } = data;
    const { courseId } = site.siteMetadata;
    const { frontmatter, fields, htmlAst } = markdownRemark;
    const { title, hosts, guests, number, tags, description } = frontmatter;
    const { slug } = fields;

    const guestStr = formatStringList('Guest', 'Guests', guests);
    const hostStr = formatStringList('Host', 'Hosts', hosts);
    const tagStr = formatStringList('Tags', 'Tags', tags);

    // Util consts for slugs and outline data
    const groupedEpisodes = getGroupedEpisodes(allMarkdownRemark);

    const [activeExc, setActiveExc] = useState(null);
    const [completed, setCompleted] = useLocalStorage(
        `${courseId}-completed-${slug.substring(1)}`,
        []
    );
    const [storedUserExpandedGroups, setUserExpandedGroups] = useLocalStorage('expandedGroups', null);

    // User-defined nav group expand/collapse state
    const html = renderAst(htmlAst);

    const handleSetActiveExc = id => {
        let scrollX;
        let scrollY;
        const loc = window.location;
        if (id !== null) {
            loc.hash = `${id}`;
        } else {
            if ('pushState' in history) {
                history.pushState('', document.title, loc.pathname + loc.search);
            } else {
                // Prevent scrolling by storing the page's current scroll offset
                scrollX = document.body.scrollLeft;
                scrollY = document.body.scrollTop;
                loc.hash = '';
                document.body.scrollLeft = scrollX;
                document.body.scrollTop = scrollY;
            }
        }
        setActiveExc(id);
    };

    useEffect(() => {
        if (location.hash) {
            setActiveExc(parseInt(location.hash.split('#')[1]));
        }
    }, [location.hash]);

    return (
        <EpisodeContext.Provider
            value={{
                activeExc,
                setActiveExc: handleSetActiveExc,
                completed,
                setCompleted,
                setUserExpandedGroups
            }}>
            <Layout title={title} defaultSelectedKeys={[slug]}>
                <GlobalStyle />
                <Wrapper>
                    <LeftContainer>
                        <LeftContent>
                            <SideNav>
                                <Navigation
                                    defaultSelectedKeys={[slug]}
                                />
                            </SideNav>
                        </LeftContent>
                    </LeftContainer>
                    <RightContainer>
                        <RightContent>
                            <EpisodeIntro>
                                <div>
                                    <StyledIconBox />
                                </div>
                                <EpisodeIntroText>
                                    {title && (
                                        <h1>
                                            <span>{title}</span>
                                        </h1>
                                    )}
                                    {guestStr && (
                                        <div>
                                            {' '}
                                            <span> {guestStr} </span>{' '}
                                        </div>
                                    )}
                                    {hostStr && (
                                        <div>
                                            {' '}
                                            <span> {hostStr} </span>{' '}
                                        </div>
                                    )}
                                    {tagStr && (
                                        <div>
                                            {' '}
                                            <span> {tagStr} </span>{' '}
                                        </div>
                                    )}
                                    {description && <p>{description}</p>}
                                </EpisodeIntroText>
                            </EpisodeIntro>
                            {html}
                        </RightContent>
                    </RightContainer>
                </Wrapper>
            </Layout>
        </EpisodeContext.Provider>
    );
};

export default Template;

// GraphQL Query
export const pageQuery = graphql`
    query($slug: String!) {
        site {
            siteMetadata {
                courseId
                title
            }
        }
        allMarkdownRemark {
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        hosts
                        guests
                        number
                        description
                        tags
                    }
                }
            }
        }
        markdownRemark(fields: { slug: { eq: $slug } }) {
            htmlAst
            fields {
                slug
            }
            frontmatter {
                title
                hosts
                guests
                number
                description
                tags
            }
        }
    }
`;

// const CustomIcon = styled(Icon)``;

const codeBgStyles = css`
    // Halfway between Varnish N2 and N3
    background: #f4f6f8 !important;
`;

// Resetting Ant Menu Styles
const GlobalStyle = createGlobalStyle`
    &&& {
        // Generic Elements

        img {
            border: 0;
            height: auto;
            max-width: 100%;
        }

        svg {
            max-width: 100%;
            color-interpolation-filters: sRGB;
            fill: currentColor;

            &:not(:root) {
                overflow: hidden;
            }
        }

        table {
            text-align: left;
            width: 100%;
            max-width: 100%;
            border-collapse: collapse;
            margin-bottom: 1.5rem;

            td, th {
                ${({ theme }) => (theme as any).typography.body}
                vertical-align: top;
                padding: 0.5rem 0.75rem;
                border: 1px solid ${({ theme }) => (theme as any).color.N4};
            }

            th {
                color: ${({ theme }) => (theme as any).color.N10};
            }

            tbody {
                tr:nth-child(even) {
                    background: ${({ theme }) => (theme as any).color.N2};
                }
            }

            code {
                white-space: nowrap;
            }
        }

        progress {
            appearance: none;
        }
    }
`;

// Everything below the header, container for left and right containers with distinct backgrounds
const Wrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.color.N3};

    @media (max-width: 1024px) {
        display: block;
    }
`;

// Left-aligned container with white background
const LeftContainer = styled.div`
    background: ${({ theme }) => theme.color.N1};
    width: calc(
        ${({ theme }) =>
            `324px + ((100vw - (${theme.breakpoints.xl} + ${theme.spacing.xxl}) - ${theme.spacing.xxl}) / 2) + ${theme.spacing.xxl}`}
    );
    height: 100%;
    display: flex;
    position: relative;
    z-index: 3;

    @media (max-width: 1024px) {
        display: none;
    }
`;

// Constrained content descendent of LeftContainer (holds sidenav)
const LeftContent = styled.div`
    width: 350px;
    height: 100%;
    margin-left: auto;
`;

// Sticky Outline navigation
const SideNav = styled.nav`
    position: relative;
    z-index: 3;
    box-sizing: content-box;
    padding-top: 30px;
    position: sticky;
    top: 115px;
    height: calc(100vh - 175px);
    overflow-x: hidden;
    overflow-y: auto;
`;

const RightContainer = styled.div`
    position: relative;
    flex: 1;
    max-width: ${({ theme }) =>
        theme.breakpoints.xl.getRemValue() +
        theme.spacing.xxl.getRemValue() -
        theme.spacing.xxl.getRemValue()}rem;
    height: 100%;

    &:before {
        position: fixed;
        top: 65px;
        display: block;
        content: '';
        width: 100%;
        height: 50px;
        z-index: 2;
        margin-left: -30px;
        box-shadow: 0 -${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl} ${theme.spacing.lg} ${theme.color.N3}`};

        @media (max-width: 1024px) {
            display: none;
        }
    }
`;

const RightContent = styled.div`
    max-width: ${({ theme }) =>
        theme.breakpoints.xl.getRemValue() +
        theme.spacing.xxl.getRemValue() -
        theme.spacing.xxl.getRemValue() -
        324 / 16}rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: ${({ theme }) => `${theme.spacing.xxl} 0 0 ${theme.spacing.xxl}`};
    box-sizing: border-box;
    margin-right: ${({ theme }) => theme.spacing.xxl};

    @media (max-width: 1024px) {
        max-width: 100%;
        padding-right: ${({ theme }) => theme.spacing.xxl};
        margin-right: 0;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
        padding: ${({ theme }) => theme.spacing.lg};
    }
`;

// Intro content rendered from markdown frontmatter and outline data
const EpisodeIntro = styled.div`
    display: grid;
    grid-template-columns: 75px auto;
    grid-gap: ${({ theme }) => theme.spacing.xl};

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
        display: block;
    }
`;

// Colored box with icon that denotes Part
const StyledIconBox = styled(IconBox)`
    width: 75px;

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
        width: 50px;
    }
`;

const mobileEpisodeTitleStyles = css`
    margin: -50px 0 24px 74px;
    min-height: 50px;
    display: flex;
    align-items: center;
`;

// Text displayed in episode intro next to icon
const EpisodeIntroText = styled.div`
    h1 {
        ${({ theme }) => theme.typography.h2}
        margin: ${({ theme }) => `-${theme.spacing.xxs} 0 ${theme.spacing.md} 0`};
        color: ${({ theme }) => theme.color.B6};

        @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
            ${({ theme }) => theme.typography.h3}

            &:first-child {
                ${mobileEpisodeTitleStyles}
            }
        }
    }

    p {
        ${({ theme }) => theme.typography.bodyBig}
        color: ${({ theme }) => theme.color.N10};
        margin-bottom: ${({ theme }) => theme.spacing.xxl};

        @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
            margin-bottom: ${({ theme }) => theme.spacing.lg};
        }
    }
`;
