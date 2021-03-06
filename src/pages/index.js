import React, { useState } from 'react';
import { graphql } from 'gatsby';
import styled, { css } from 'styled-components';
import AnimateHeight from 'react-animate-height';
import { above } from '@allenai/varnish/theme/breakpoints';

import { getGroupedEpisodes } from '../utils';
import Layout from '../components/Layout';
import { Link } from '../components/Link';
import { Container } from '../components/Container';
import { Card, CardContent } from '../components/Card';
import { Footer } from '../components/Footer';
import { IconBox } from '../components/IconBox';
import { ArrowRightIcon, ExpandCollapseIcon, Disclosure } from '../components/inlineSVG';

function renderDescription(description) {
  const lines = description.split("\n");
  const result = [];
  lines.forEach(line => {
    result.push(line);
    result.push(<br/>);
    result.push(<br/>);
  });
  result.pop();
  result.pop();
  return result
}

// Home Page Export
export default ({ data }) => {
    const groupedEpisodes = getGroupedEpisodes(data.allMarkdownRemark);
    const episodeSlugs = Object.keys(groupedEpisodes);
    episodeSlugs.sort()
    episodeSlugs.reverse()
    console.log(groupedEpisodes)

    return (
        <Layout groupedEpisodes={groupedEpisodes}>
            <Banner>
                <h1>{data.site.siteMetadata.title}</h1>
            </Banner>
            <About>
                <SectionIntro>
                    <h2>About the podcast</h2>
                    <p>
                      NLP Highlights is a podcast discussing interesting recent work in natural
                      language processing.  The hosts are members of the AllenNLP team at the Allen
                      Institute for AI.  This website contains a page for each episode, with
                      transcriptions.
                    </p>

                    <p>
                      A note: transcribing technical discussions involving non-native speakers is
                      challenging!  We have worked with our transcribers to try to make sure the
                      technical terms and names used are correct, but there are surely errors that
                      we missed.  To improve the transcriptions, please open a pull request on the
                      <Link to="https://github.com/allenai/nlphighlights"> Github page</Link> for
                      this website.
                    </p>
                </SectionIntro>
                <PartContainer>
                </PartContainer>
            </About>
            <Parts>
                <SectionIntro>
                    <h2>Episodes</h2>
                </SectionIntro>
                <EpisodeList>
                    {episodeSlugs.map(episodeSlug => (
                        <EpisodeLink key={episodeSlug} to={episodeSlug}>
                            <h4>{parseInt(groupedEpisodes[episodeSlug].node.frontmatter.number)}: {groupedEpisodes[episodeSlug].node.frontmatter.title}</h4>
                            <p>
                                {renderDescription(groupedEpisodes[episodeSlug].node.frontmatter.description)}
                                <StyledArrowRightIcon />
                            </p>
                            <MobileDisclosure />
                        </EpisodeLink>
                    ))}
                </EpisodeList>
            </Parts>
            <Credits>
                NLP Highlights is a podcast run by the <Link to={data.site.siteMetadata.siteUrl}>AllenNLP</Link>{' '}
                team at the{' '} <Link to="https://allenai.org/">Allen Institute for AI</Link>.<br />
            </Credits>
            <Footer />
        </Layout>
    );
};

// GraphQL Query
export const pageQuery = graphql`
    {
        site {
            siteMetadata {
                siteUrl
                title
                description
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
                        description
                        hosts
                        guests
                        number
                        tags
                    }
                }
            }
        }
    }
`;

// Hero Banner
const Banner = styled(Container)`
    background: url('/ui/bannerDotsLeft.svg') left center / auto 100% no-repeat,
        url('/ui/bannerDotsRight.svg') right center / auto 100% no-repeat,
        linear-gradient(168.81deg, #1b4596 27.29%, #1052d2 82.34%);

    h1 {
        font-size: ${({ theme }) => theme.spacing.xl};
        line-height: ${({ theme }) => theme.spacing.xxl};
        font-weight: ${({ theme }) => theme.typography.fontWeightBold};
        color: ${({ theme }) => theme.color.N1};
        text-align: center;
        margin: 0 auto;
        max-width: 720px;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
        background: url('/ui/bannerDotsRight.svg') right center / auto 100% no-repeat,
            linear-gradient(168.81deg, #1b4596 27.29%, #1052d2 82.34%);

        h1 {
            font-size: 28px;
            line-height: 1.3;
            margin: ${({ theme }) => theme.spacing.md} auto;
        }
    }
`;

// Intro Content

const About = styled(Container)`
    background: ${({ theme }) => theme.color.N1};
`;

const Parts = styled(Container)`
    background: ${({ theme }) => theme.color.N4};
`;

const SectionIntro = styled.div`
    margin-bottom: ${({ theme }) => theme.spacing.xl};

    h2 {
        ${({ theme }) => theme.typography.h4};
    }

    p {
        margin: 0;
        padding-top: ${({ theme }) => theme.spacing.xxs};
        padding-bottom: ${({ theme }) => theme.spacing.xs};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
        text-align: center;

        p {
            ${({ theme }) => theme.typography.bodyBig};
            padding-bottom: 0;
        }
    }
`;

// Part UI

// Container for colored icon, title and description
const PartHeader = ({ className, color, icon, title, description, slug, onClick = () => {} }) => (
    <PartHeaderContainer className={className} onClick={onClick}>
        <StyledIconBox color={color} icon={icon} />
        <PartHeaderText>
            {title && (
                <PartTitle>
                    <span>{title}</span>
                </PartTitle>
            )}
            {description && (
                <PartDescription>
                    <p>{description}</p>
                    {slug && <MobileDisclosure />}
                </PartDescription>
            )}
            {slug && (
                <BeginLink>
                    <div>
                        Begin Episode <StyledArrowRightIcon />
                    </div>
                </BeginLink>
            )}
        </PartHeaderText>
    </PartHeaderContainer>
);

// Right arrow icon for episode links
const StyledArrowRightIcon = styled(ArrowRightIcon)`
    opacity: 0;
    margin-left: 8px;
    transition: opacity 0.2s ease, transform 0.2s ease;
    fill: ${({ theme }) => theme.color.B6};
`;

const activeStyledArrowRightIconStyles = css`
    ${StyledArrowRightIcon} {
        opacity: 1;
        transform: translateX(2px);
    }
`;

// Styled wrapper for `PartHeader` component
const PartHeaderContainer = styled.div`
    display: flex;
    cursor: pointer;

    &:hover {
        ${activeStyledArrowRightIconStyles}
    }
`;

// Colored box with icon
const StyledIconBox = styled(IconBox)`
    width: ${({ theme }) => theme.spacing.xxl.getRemValue() * 4}rem;

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
        position: absolute;
        width: 80px;
        height: 80px;
    }
`;

// Container for part title and description
const PartHeaderText = styled.div`
    padding: ${({ theme }) =>
        `${theme.spacing.md.getRemValue() * 2 -
            theme.spacing.xxs.getRemValue()}rem ${theme.spacing.md.getRemValue() * 2}rem`};
    padding-bottom: ${({ theme }) =>
        theme.spacing.md.getRemValue() * 2 +
        theme.spacing.xxl.getRemValue() -
        theme.spacing.xxs.getRemValue()}rem;
    flex: 1;
    display: flex;
    flex-direction: column;

    p {
        margin-bottom: 0;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
        padding: 0 0 ${({ theme }) => theme.spacing.xxxl} 0;

        p {
            padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
        }
    }
`;

const PartTitle = styled.h3`
    ${({ theme }) => theme.typography.h4};
    padding-bottom: 0;
    color: ${({ theme }) => theme.color.B6};

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
        background: ${({ theme }) => theme.color.N2};
        font-size: 20px;
        padding-left: 80px;
        min-height: 80px;
        display: flex;
        align-items: center;

        span {
            padding: 0 ${({ theme }) => theme.spacing.lg};
        }
    }
`;

const PartDescription = styled.div`
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
        display: flex;
        align-items: center;
        padding-right: ${({ theme }) => theme.spacing.md};

        p {
            flex: 1;
        }
    }
`;

// Begin Episode link for Overview
const BeginLink = styled.div`
    ${({ theme }) => theme.typography.bodySmall};
    display: grid;
    grid-template-columns: max-content;
    margin-top: auto;

    div {
        display: flex;
        align-items: center;

        @media ${({ theme }) => above(theme.breakpoints.md)} {
            &:hover {
                text-decoration: underline;
            }
        }
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
        display: none;
    }
`;

const MobileDisclosure = styled(Disclosure)`
    display: none;
    fill: ${({ theme }) => theme.color.N6};
    transition: fill 0.2s ease;

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
        display: block;
    }
`;

// Clickable wrapper for standalone episode
const StandaloneEpisodeLink = styled(Link)`
    && {
        &,
        &:hover {
            text-decoration: none;

            ${PartTitle} {
                color: ${({ theme }) => theme.color.B6};
            }

            p {
                color: ${({ theme }) => theme.palette.text.primary};
            }
        }

        ${PartHeaderText} {
            padding-bottom: ${({ theme }) =>
                theme.spacing.md.getRemValue() * 2 - theme.spacing.xxs.getRemValue()}rem;

            @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
                padding-bottom: 0;

                p {
                    margin-bottom: ${({ theme }) => theme.spacing.sm};
                }
            }
        }

        &:hover {
            ${MobileDisclosure} {
                fill: ${({ theme }) => theme.color.B6};
            }
        }
    }
`;

// Container for PartHeader and episode list
const Part = ({ data, groupedEpisodes }) => {
    const { color, icon, title, description, episodeSlugs } = data;
    const [episodeListIsVisible, setChaperListVisibility] = useState(false);

    return (
        <PartContainer episodeListIsVisible={episodeListIsVisible}>
            <PartHeader
                color={color}
                icon={icon}
                title={title}
                description={description}
                onClick={() => setChaperListVisibility(!episodeListIsVisible)}
                episodeListIsVisible={episodeListIsVisible}
            />
            <div>
                <EpisodeListTrigger>
                    <TriggerClickArea
                        onClick={() => setChaperListVisibility(!episodeListIsVisible)}>
                        <TriggerTooltip>
                            Explore {title.substr(0, title.indexOf(':'))}
                        </TriggerTooltip>
                        <TriggerIcon isExpanded={episodeListIsVisible} />
                    </TriggerClickArea>
                </EpisodeListTrigger>
                <AnimateHeight animateOpacity={true} height={episodeListIsVisible ? 'auto' : 0}>
                    <EpisodeList>
                        {episodeSlugs.map(episodeSlug => (
                            <EpisodeLink key={episodeSlug} to={episodeSlug}>
                                <h4>{groupedEpisodes[episodeSlug].node.frontmatter.title}</h4>
                                <p>
                                    {groupedEpisodes[episodeSlug].node.frontmatter.description}
                                    <StyledArrowRightIcon />
                                </p>
                                <MobileDisclosure />
                            </EpisodeLink>
                        ))}
                    </EpisodeList>
                </AnimateHeight>
            </div>
        </PartContainer>
    );
};

// Visual treatment that makes card look like it's popping out of the screen
const activeCardStyles = css`
    box-shadow: 0 ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`} rgba(10, 41, 57, 0.25);
    transform: translateY(-1px);
`;

// Morphing expand/collapse caret
const TriggerIcon = styled(ExpandCollapseIcon)`
    margin-left: auto;
    margin-right: -${({ theme }) => theme.spacing.sm};
    transition: transform 0.3s ease;
`;

const TriggerClickArea = styled.div`
    margin-left: auto;
    display: flex;
    align-items: center;
    padding: 0 ${({ theme }) => theme.spacing.md.getRemValue() * 2}rem;
    width: calc(100% - ${({ theme }) => theme.spacing.xxl.getRemValue() * 4}rem);
    position: relative;
    cursor: pointer;

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
        width: 100%;
        padding: 0 ${({ theme }) => theme.spacing.lg};
    }
`;

// Styled wrapper for `Part` component
const PartContainer = styled(({ episodeListIsVisible, ...props }) => <Card {...props} />)`
    overflow: hidden;
    @media ${({ theme }) => above(theme.breakpoints.md)} {
        ${({ episodeListIsVisible }) => (episodeListIsVisible ? activeCardStyles : null)}
    }

    @media ${({ theme }) => above(theme.breakpoints.md)} {
        &:hover {
            ${activeCardStyles}
        }

        [class*='PartHeader']:hover + div,
        ${TriggerClickArea}:hover {
            ${TriggerIcon} {
                transform: translateY(2px);
                span.rect {
                    background: ${({ theme }) => theme.color.B6};
                }
            }

            ${({ episodeListIsVisible, theme }) =>
                episodeListIsVisible
                    ? `
                ${TriggerIcon} {
                    transform: translateY(-2px);
                }
            `
                    : null}
        }
    }
`;

// Clickable bar that triggers expand/collapse of episode list
const EpisodeListTrigger = styled.div`
    background: ${({ theme }) => theme.color.N2};
    min-height: ${({ theme }) => theme.spacing.xxl};
    margin-top: -${({ theme }) => theme.spacing.xxl};
    display: flex;
`;

// E.g. "Explore Part 1"
const TriggerTooltip = styled.span`
    ${({ theme }) => theme.typography.bodySmall}
    color: ${({ theme }) => theme.color.B6};

    @media ${({ theme }) => above(theme.breakpoints.md)} {
        &:hover {
            text-decoration: underline;
        }
    }
`;

// Container for list of episodes for a given part
const EpisodeList = styled(CardContent)`
    background: ${({ theme }) => theme.color.N2};
    padding-bottom: ${({ theme }) => theme.spacing.md.getRemValue() * 2}rem;

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
        padding-top: 0;
    }
`;

// Clickable item in a episode list
const EpisodeLink = styled(Link)`
    && {
        display: block;
        background: ${({ theme }) => theme.color.N1};
        border: 1px solid ${({ theme }) => theme.color.N6};
        border-radius: ${({ theme }) => theme.spacing.xxs};
        transition: border-color 0.1s ease, box-shadow 0.1s ease;
        padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.md.getRemValue() * 2}rem`};

        & + & {
            margin-top: ${({ theme }) => theme.spacing.md} !important;
        }

        h4 {
            ${({ theme }) => theme.typography.bodyBig}
            transition: color 0.1s ease;
            margin: 0;
        }

        p {
            margin: 0;
            color: ${({ theme }) => theme.color.N10};
        }

        &:hover {
            text-decoration: none;
            border-color: ${({ theme }) => theme.color.B6};
            box-shadow: 0 ${({ theme }) => `${theme.spacing.xxs} ${theme.spacing.sm}`}
                rgba(10, 41, 57, 0.1);

            h4 {
                color: ${({ theme }) => theme.color.B6};
            }

            ${activeStyledArrowRightIconStyles}
        }

        @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
            padding: ${({ theme }) => theme.spacing.md};
            ${activeStyledArrowRightIconStyles}
            display: flex;
            align-items: center;

            h4 {
                ${({ theme }) => theme.typography.body}
                flex: 1;
                padding-right: ${({ theme }) => theme.spacing.md};
            }

            p {
                display: none;
            }

            ${MobileDisclosure} {
                margin-left: auto;
            }

            &:hover {
                ${MobileDisclosure} {
                    fill: ${({ theme }) => theme.color.B6};
                }
            }
        }
    }
`;

// Footer Site Credits
const Credits = styled(Container)`
    background: ${({ theme }) => theme.color.N2};
    border-bottom: 1px solid ${({ theme }) => theme.color.N4};
    padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.xxl}`};
    text-align: center;
`;
