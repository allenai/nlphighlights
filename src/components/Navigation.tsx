// This component is a generalized navigation menu used for episode outline side-nav on desktop
// and global navigation on mobile. Based on menu design and implementation on AI2 website:
// https://github.com/allenai/ai2-web/blob/master/ui/lib/components/chrome/Header.tsx

import React, { JSXElementConstructor } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Menu, Icon } from 'antd';
import { Link } from './Link';
import { toRem } from '../utils/utils';

interface Props {
    className?: string;
    isMobile?: boolean;
    headerLinks?: { url: string; text: string}[];
    defaultSelectedKeys: string[];
    defaultOpenKeys?: string[];
}

export const Navigation = ({
    className,
    isMobile = false,
    headerLinks,
    defaultSelectedKeys = [],
    defaultOpenKeys = [],
}: Props) => {
    let MenuContainer: JSXElementConstructor<any> = isMobile ? Menu : DesktopMenu;
    let MenuItem = isMobile ? MobileMenuItem : Menu.Item;
    let LandingLink = isMobile ? MobileLandingLink : Link;

    return (
        <React.Fragment>
            <MenuContainer
                className={className}
                defaultSelectedKeys={defaultSelectedKeys}
                defaultOpenKeys={defaultOpenKeys}
                mode="inline"
                inlineIndent={isMobile ? 0 : 24}>
                {isMobile && (
                    <MenuItem key="home">
                        <LandingLink href="/">Home</LandingLink>
                    </MenuItem>
                )}
                {isMobile &&
                    headerLinks.map(headerLink => (
                        <MenuItem key={headerLink.url}>
                            <LandingLink to={headerLink.url}>{headerLink.text}</LandingLink>
                        </MenuItem>
                    ))}
            </MenuContainer>
        </React.Fragment>
    );
};

// Keyframe data for mobile nav entrance animation
export const mobileNavEntrance = yOffset => keyframes`
    0% {
        opacity: 0;
        // Passing y offset value from where this animation is called
        transform: translateY(-${yOffset});
    }
    50% {
        transform: translateY(0);
    }
    100% {
        opacity: 1;
    }
`;


const CustomIcon = styled(Icon)`
    svg {
        width: 17px;
        height: 17px;
        margin-right: -4px;
        transform: translate(-2px, 1.5px);
        stroke: ${({ theme }) => theme.color.N8};
    }`;

const DesktopMenu = styled(Menu)`
&&& {
        .ant-menu {
            border: none !important;

            svg {
                color: ${({ theme }) => theme.color.N8};
            }

            .ant-menu-submenu-title,
            .ant-menu-item {
                overflow: visible !important;
                white-space: normal !important;
                height: auto !important;
                line-height: 1.5 !important;
            }

            .ant-menu-item {
                a {
                    color: ${({ theme }) => theme.color.N10};
                }

                &.ant-menu-item-selected {
                    background: ${({ theme }) => theme.color.B1} !important;

                    &:after {
                        border-color: ${({ theme }) => theme.color.B5} !important;
                    }

                    a {
                        color: ${({ theme }) => theme.color.B5} !important;
                    }
                }
            }

            ${CustomIcon} {
                svg {
                    width: 17px;
                    height: 17px;
                    margin-right: -4px;
                    transform: translate(-2px, 1.5px);
                    stroke: ${({ theme }) => theme.color.N8};
                }
            }

            .ant-menu-submenu {
                border-top: 1px solid ${({ theme }) => theme.color.N4} !important;

                &.ant-menu-submenu-selected {
                    &,
                    span,
                    i,
                    svg {
                        color: ${({ theme }) => theme.color.B5} !important;
                        stroke: ${({ theme }) => theme.color.B5};
                    }
                }

                .ant-menu-submenu-title:hover {
                    &,
                    span,
                    i,
                    svg,
                    i:before,
                    i:after {
                        color: ${({ theme }) => theme.color.B5} !important;
                        stroke: ${({ theme }) => theme.color.B5};
                    }
                }
            }

            .ant-menu-submenu-title {
                &:hover {
                    .ant-menu-submenu-arrow {
                        &:before,
                        &:after {
                            background: linear-gradient(90deg, ${({ theme }) =>
                                `${theme.color.B5}, ${theme.color.B5}`}) !important;
                        }
                    }
                }
            }

            .ant-menu-submenu-title,
            .ant-menu-item {
                padding-top: 9px !important;
                padding-bottom: 10px !important;
            }

            .ant-menu-item {
                a {
                    &:hover {
                        &,
                        svg {
                            color: ${({ theme }) => theme.color.B5};
                            stroke: ${({ theme }) => theme.color.B5};
                        }
                        text-decoration: none;
                    }
                }
            }
        }
    }`;

const linkStyles = () => css`
    ${({ theme }) => theme.typography.body}
    display: block;
    font-weight: ${({ theme }) => theme.typography.fontWeightMedium};
    color: ${({ theme }) => theme.color.B6};
    padding: ${({ theme }) => theme.spacing.xs};
`;

const landingLinkStyles = () => css`
    ${linkStyles}
    color: ${({ theme }) => theme.color.N9};
`;

const MobileInteriorLink = styled(Link)`
    transition: none;

    &:active {
        text-decoration: none;
    }

    ${linkStyles}

    &&:hover {
        color: ${({ theme }) => theme.color.B6};
    }
`;

const MobileLandingLink = styled(MobileInteriorLink)`
    ${landingLinkStyles}
`;

const MobileSubMenuTitle = styled.span`
    ${landingLinkStyles}
    cursor: default;
`;

// These styles are applied both to MenuItem and
// SubMenu components
const mobileNavItemStyles = () => css`
    // horizontal divider line between top-level items
    border-top: 1px solid ${({ theme }) => theme.color.N4};

    // Give all top-level links, section titles and interior links
    // consistent look and feel per design
    ${MobileSubMenuTitle},
    ${MobileLandingLink},
    ${MobileInteriorLink} {
        ${({ theme }) => theme.typography.bodyBig};
        padding: ${({ theme }) => `${theme.spacing.md} ${toRem(18)}`};
        color: ${({ theme }) => theme.color.N9};
        text-decoration: none;
    }

    // Give mobile nav links an obvious tap state
    // (MobileSubMenuTitle doesn't apply since it's not clickable)
    ${MobileLandingLink},
    ${MobileInteriorLink} {
        -webkit-tap-highlight-color: ${({ theme }) => theme.color.B6};
    }
`;

// These are styles applied to the direct parent of MobileSubMenuTitle, MobileLandingLink,
// or MobileInteriorLink. SubMenu structures have an additional node between
// top-level item li and link which is why these can't be applied to
// `mobileNavItemStyles` above
const mobileNavLinkContainerStyles = () => css`
    // Reset hard-coded Ant spacing
    margin: 0;
    height: auto;
    line-height: inherit;
`;

// Mobile Nav Item that does not have a submenu
const MobileMenuItem = styled(Menu.Item)`
    ${mobileNavItemStyles}

    &&& {
        margin-bottom: 0 !important;
        ${mobileNavLinkContainerStyles}
    }
`;
